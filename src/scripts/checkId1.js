// Simple script to check ID 1
const { pool } = require('../database/dbConfig');

async function checkId1() {
    try {
        const query = `SELECT m.id, m.nome, m.exibir, m.id_categoria, me.id_traducao 
                       FROM membros m 
                       LEFT JOIN membros_en me ON m.id = me.id_membro 
                       WHERE m.id = 1`;

        const result = await pool.query(query);

        if (result.rows.length === 0) {
            console.log('ID 1 NÃO EXISTE na tabela membros!');
        } else {
            const membro = result.rows[0];
            console.log(JSON.stringify(membro, null, 2));
        }

        process.exit(0);
    } catch (error) {
        console.error('Erro:', error.message);
        process.exit(1);
    }
}

checkId1();
