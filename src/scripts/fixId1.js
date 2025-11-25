// Script to fix ID 1 - set exibir to TRUE and add translation if missing
const { pool } = require('../database/dbConfig');
const { translateText } = require('../services/translateService');

async function fixId1() {
    try {
        console.log('Fixing member ID 1...\n');

        // First, set exibir = TRUE
        await pool.query('UPDATE membros SET exibir = TRUE WHERE id = 1');
        console.log('✓ Set exibir = TRUE for ID 1');

        // Check if translation exists
        const checkQuery = `SELECT id_traducao FROM membros_en WHERE id_membro = 1`;
        const checkResult = await pool.query(checkQuery);

        if (checkResult.rows.length === 0) {
            // Get the description to translate
            const descQuery = `SELECT descricao FROM membros WHERE id = 1`;
            const descResult = await pool.query(descQuery);

            if (descResult.rows.length > 0) {
                const descricao = descResult.rows[0].descricao;
                console.log('\nTranslating description...');

                const descricaoEn = await translateText(descricao, 'en');

                if (descricaoEn) {
                    await pool.query(
                        'INSERT INTO membros_en (id_membro, descricao) VALUES ($1, $2)',
                        [1, descricaoEn]
                    );
                    console.log('✓ Translation added for ID 1');
                } else {
                    console.warn('✗ Translation failed');
                }
            }
        } else {
            console.log('✓ Translation already exists for ID 1');
        }

        console.log('\nDone!');
        process.exit(0);

    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

fixId1();
