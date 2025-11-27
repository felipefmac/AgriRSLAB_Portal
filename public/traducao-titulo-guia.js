// Dicionário de traduções para os títulos das páginas
const dicionarioTitulo = {
    pt: {
        "navInicio": "Início - AgriRS Lab",
        "navArtigos": "Artigos e Publicações - AgriRS Lab",
        "navNoticias": "Notícias - AgriRS Lab",
        "navMembros": "Membros - AgriRS Lab",
        "navProjetos": "Projetos - AgriRS Lab",
        "navSobre": "Sobre - AgriRS Lab",
        "navVagas": "Vagas - AgriRS Lab",
        "navFale_Conosco": "Fale Conosco - AgriRS Lab"
    },
    en: {
        "navInicio": "Home - AgriRS Lab",
        "navArtigos": "Articles and Publications - AgriRS Lab",
        "navNoticias": "News - AgriRS Lab",
        "navMembros": "Members - AgriRS Lab",
        "navProjetos": "Projects - AgriRS Lab",
        "navSobre": "About - AgriRS Lab",
        "navVagas": "Jobs - AgriRS Lab",
        "navFale_Conosco": "Contact Us - AgriRS Lab"
    }
};

// Função para obter o idioma atual do localStorage
function obterIdiomaAtual() {
    return localStorage.getItem('selectedLanguage') || 'pt';
}

// Função que atualiza o título da guia do navegador
function atualizarTituloGuia() {
    const idioma = obterIdiomaAtual();
    const titleElement = document.querySelector('title[data-i18n-key]');

    if (titleElement) {
        const chave = titleElement.getAttribute('data-i18n-key');
        if (dicionarioTitulo[idioma] && dicionarioTitulo[idioma][chave]) {
            document.title = dicionarioTitulo[idioma][chave];
        }
    }
}

// Atualizar título quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    atualizarTituloGuia();
});

// Observar mudanças no localStorage para atualizar quando o idioma mudar (para mudanças em outras abas)
window.addEventListener('storage', (e) => {
    if (e.key === 'selectedLanguage') {
        atualizarTituloGuia();
    }
});

// Escutar o evento 'languageChange' disparado pelo sistema quando o idioma muda na mesma aba
window.addEventListener('languageChange', () => {
    atualizarTituloGuia();
});