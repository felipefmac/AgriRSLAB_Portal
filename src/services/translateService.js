const translate = require('@iamtraction/google-translate');

/**
 * Traduz um texto para o idioma de destino
 * @param {string} text - Texto a ser traduzido
 * @param {string} targetLang - Idioma de destino (padrão: 'en')
 * @returns {Promise<string|null>} Texto traduzido ou null em caso de erro
 */
async function translateText(text, targetLang = 'en') {
    if (!text || text.trim() === '') return null;

    try {
        const result = await translate(text, { to: targetLang });
        return result.text;
    } catch (error) {
        console.error(`Erro ao traduzir texto para ${targetLang}:`, error.message);
        return null; // Retorna null em caso de erro, permitindo fallback
    }
}

/**
 * Traduz todos os campos de uma notícia para inglês
 * @param {string} titulo - Título da notícia
 * @param {string} subtitulo - Subtítulo da notícia
 * @param {string} texto - Texto completo da notícia
 * @returns {Promise<Object>} Objeto com os campos traduzidos
 */
async function translateNoticia(titulo, subtitulo, texto) {
    try {
        // Traduz todos os campos em paralelo para melhor performance
        const [tituloEn, subtituloEn, textoEn] = await Promise.all([
            translateText(titulo, 'en'),
            subtitulo ? translateText(subtitulo, 'en') : null,
            translateText(texto, 'en')
        ]);

        return {
            tituloEn,
            subtituloEn,
            textoEn
        };
    } catch (error) {
        console.error('Erro ao traduzir notícia:', error);
        // Retorna valores null em caso de erro
        return {
            tituloEn: null,
            subtituloEn: null,
            textoEn: null
        };
    }
}

module.exports = {
    translateText,
    translateNoticia
};
