// Script para traduzir todas as descrições dos membros que ainda não possuem tradução
const { pool } = require('../database/dbConfig');
const { translateText } = require('../services/translateService');

async function translateAllMembros() {
    try {
        console.log('Iniciando tradução de membros...');

        // Busca todos os membros que não possuem tradução
        const query = `
            SELECT m.id, m.descricao
            FROM membros m
            LEFT JOIN membros_en me ON m.id = me.id_membro
            WHERE me.id_traducao IS NULL
            ORDER BY m.id;
        `;

        const result = await pool.query(query);
        const membros = result.rows;

        console.log(`Encontrados ${membros.length} membros sem tradução.`);

        if (membros.length === 0) {
            console.log('Todos os membros já possuem tradução!');
            return;
        }

        // Traduz cada membro
        for (const membro of membros) {
            console.log(`Traduzindo membro ID ${membro.id}...`);

            const descricaoEn = await translateText(membro.descricao, 'en');

            if (descricaoEn) {
                // Insere a tradução
                const insertQuery = `
                    INSERT INTO membros_en (id_membro, descricao)
                    VALUES ($1, $2)
                `;
                await pool.query(insertQuery, [membro.id, descricaoEn]);
                console.log(`✓ Membro ID ${membro.id} traduzido com sucesso.`);
            } else {
                console.warn(`✗ Falha ao traduzir membro ID ${membro.id}`);
            }

            // Aguarda um pouco entre traduções para não sobrecarregar a API
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        console.log('\nTradução concluída!');
        process.exit(0);

    } catch (error) {
        console.error('Erro ao traduzir membros:', error);
        process.exit(1);
    }
}

// Executa o script
translateAllMembros();
