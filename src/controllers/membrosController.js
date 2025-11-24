// src/controladores/membrosController.js

const { pool } = require('../database/dbConfig');
const fs = require('fs'); // Para deletar arquivos no servidor
const path = require('path');
const { translateText } = require('../services/translateService');

// Caminho absoluto para a pasta de uploads
const uploadDir = path.resolve(__dirname, '..', 'upload', 'membros');

// Garante que a pasta exista
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// --- C.R.U.D. Membros ---
// [C]RIAR Membro (POST)
async function criarMembro(req, res) {
    const { nome, descricao, link, id_categoria, exibir } = req.body;
    const foto = req.file ? `/upload/membros/${req.file.filename}` : null;

    if (!nome || !descricao || !foto) {
        return res.status(400).json({ mensagem: 'Preencha todos os campos obrigatórios.' });
    }

    const query = `
        INSERT INTO membros (nome, descricao, foto, link, id_categoria, exibir)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id;
    `;

    try {
        const resultado = await pool.query(query, [nome, descricao, foto, link || null, id_categoria, exibir === 'true']);
        const membroId = resultado.rows[0].id;

        // Traduz descrição em segundo plano
        translateMembro(membroId, descricao).catch(err =>
            console.error('Erro ao traduzir membro:', err)
        );

        res.status(201).json({ mensagem: 'Membro criado com sucesso.', id: membroId });
    } catch (error) {
        console.error('Erro ao criar membro:', error.message);
        res.status(500).json({ mensagem: 'Erro interno ao criar membro.' });
    }
}


// [R]EAD - Listar Membros (GET)
async function listarMembros(req, res) {
    const query = `
        SELECT 
            m.id, m.nome, m.descricao, m.foto, m.link, m.id_categoria, m.exibir,
            g.nome AS grupo_nome
        FROM membros m
        LEFT JOIN categoria_membros g ON m.id_categoria = g.id
        ORDER BY g.nome, m.nome;
    `;

    try {
        const resultado = await pool.query(query);
        res.status(200).json(resultado.rows);
    } catch (error) {
        console.error('Erro ao listar membros:', error.message);
        res.status(500).json({ mensagem: 'Erro interno ao listar membros.' });
    }
}


// [U]PDATE - Atualizar membro (PUT)
async function atualizarMembro(req, res) {
    const { id } = req.params;
    const { nome, descricao, link, id_categoria, exibir } = req.body;

    try {
        // Busca membro atual
        const membroAtual = await pool.query('SELECT foto FROM membros WHERE id = $1', [id]);
        if (membroAtual.rows.length === 0) {
            return res.status(404).json({ mensagem: 'Membro não encontrado.' });
        }

        const fotoAtual = membroAtual.rows[0].foto;
        let novaFoto = fotoAtual;

        // Se enviou nova foto
        if (req.file) {
            novaFoto = `/upload/membros/${req.file.filename}`;

            // Remove foto antiga se existir
            if (fotoAtual) {
                const caminhoAntigo = path.join(__dirname, '..', fotoAtual);
                if (fs.existsSync(caminhoAntigo)) {
                    fs.unlinkSync(caminhoAntigo);
                }
            }
        }

        const query = `
            UPDATE membros
            SET nome = $1, descricao = $2, foto = $3, link = $4, id_categoria = $5, exibir = $6
            WHERE id = $7
        `;

        await pool.query(query, [nome, descricao, novaFoto, link || null, id_categoria, exibir === 'true', id]);

        // Atualiza tradução em segundo plano
        translateMembro(id, descricao, true).catch(err =>
            console.error('Erro ao atualizar tradução do membro:', err)
        );

        res.status(200).json({ mensagem: 'Membro atualizado com sucesso.' });
    } catch (error) {
        console.error('Erro ao atualizar membro:', error.message);
        res.status(500).json({ mensagem: 'Erro interno ao atualizar membro.' });
    }
}


// [D]ELETE - Deletar Membro (DELETE)
async function deletarMembro(req, res) {
    const { id } = req.params;

    try {
        // Busca o caminho da foto antes de deletar
        const resultado = await pool.query('SELECT foto FROM membros WHERE id = $1', [id]);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensagem: 'Membro não encontrado.' });
        }

        const foto = resultado.rows[0].foto;

        // Deleta do banco
        await pool.query('DELETE FROM membros WHERE id = $1', [id]);

        // Remove a foto do servidor
        if (foto) {
            const caminhoFoto = path.join(__dirname, '..', foto);
            if (fs.existsSync(caminhoFoto)) {
                fs.unlinkSync(caminhoFoto);
            }
        }

        res.status(200).json({ mensagem: 'Membro deletado com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar membro:', error.message);
        res.status(500).json({ mensagem: 'Erro interno ao deletar membro.' });
    }
}


// -------------------------------------

async function listarMembrosPublicos(req, res) {
    const lang = req.query.lang || 'pt';

    // Query diferente dependendo do idioma
    const query = lang === 'en'
        ? `SELECT 
            m.id, m.nome, 
            COALESCE(me.descricao, m.descricao) as descricao,
            m.foto, m.link, m.id_categoria, m.exibir,
            g.nome AS grupo_nome
        FROM membros m
        LEFT JOIN categoria_membros g ON m.id_categoria = g.id
        LEFT JOIN membros_en me ON m.id = me.id_membro
        WHERE m.exibir = TRUE
        ORDER BY g.nome, m.nome;`
        : `SELECT 
            m.id, m.nome, m.descricao, m.foto, m.link, m.id_categoria, m.exibir,
            g.nome AS grupo_nome
        FROM membros m
        LEFT JOIN categoria_membros g ON m.id_categoria = g.id
        WHERE m.exibir = TRUE
        ORDER BY g.nome, m.nome;`;

    try {
        const resultado = await pool.query(query);
        res.status(200).json(resultado.rows);
    } catch (error) {
        console.error('Erro ao listar membros públicos:', error.message);
        res.status(500).json({ mensagem: 'Erro interno do servidor ao listar membros.' });
    }
}


// ------------------------------------------------------------
// FUNÇÃO AUXILIAR DE TRADUÇÃO
// ------------------------------------------------------------

async function translateMembro(membroId, descricao, isUpdate = false) {
    try {
        const descricaoEn = await translateText(descricao);

        if (!descricaoEn) {
            console.warn('Tradução retornou null para membro', membroId);
            return;
        }

        if (isUpdate) {
            // Verifica se já existe tradução
            const checkQuery = `SELECT id_traducao FROM membros_en WHERE id_membro = $1`;
            const checkResult = await pool.query(checkQuery, [membroId]);

            if (checkResult.rows.length > 0) {
                // Atualiza tradução existente
                const updateQuery = `
                    UPDATE membros_en 
                    SET descricao = $1 
                    WHERE id_membro = $2
                `;
                await pool.query(updateQuery, [descricaoEn, membroId]);
            } else {
                // Insere nova tradução
                const insertQuery = `
                    INSERT INTO membros_en (id_membro, descricao) 
                    VALUES ($1, $2)
                `;
                await pool.query(insertQuery, [membroId, descricaoEn]);
            }
        } else {
            // Insere nova tradução
            const insertQuery = `
                INSERT INTO membros_en (id_membro, descricao) 
                VALUES ($1, $2)
            `;
            await pool.query(insertQuery, [membroId, descricaoEn]);
        }
    } catch (error) {
        console.error('Erro ao traduzir membro:', error);
    }
}


module.exports = {
    criarMembro,
    listarMembros,
    atualizarMembro,
    deletarMembro,
    listarMembrosPublicos,
};
