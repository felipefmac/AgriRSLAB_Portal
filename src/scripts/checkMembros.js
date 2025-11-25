// Script para verificar o status de todos os membros
const { pool } = require('../database/dbConfig');

async function checkAllMembros() {
    try {
        console.log('Verificando todos os membros...\n');

        // Busca todos os membros
        const query = `
            SELECT 
                m.id, 
                m.nome, 
                m.exibir, 
                m.id_categoria,
                me.id_traducao,
                me.descricao as descricao_en
            FROM membros m
            LEFT JOIN membros_en me ON m.id = me.id_membro
            ORDER BY m.id;
        `;

        const result = await pool.query(query);
        const membros = result.rows;

        console.log(`Total de membros: ${membros.length}\n`);

        membros.forEach(membro => {
            console.log(`ID: ${membro.id}`);
            console.log(`Nome: ${membro.nome}`);
            console.log(`Exibir: ${membro.exibir}`);
            console.log(`Categoria: ${membro.id_categoria}`);
            console.log(`Tem tradução: ${membro.id_traducao ? 'Sim' : 'Não'}`);
            if (membro.descricao_en) {
                console.log(`Descrição EN (primeiros 50 chars): ${membro.descricao_en.substring(0, 50)}...`);
            }
            console.log('---');
        });

        process.exit(0);

    } catch (error) {
        console.error('Erro ao verificar membros:', error);
        process.exit(1);
    }
}

// Executa o script
checkAllMembros();
