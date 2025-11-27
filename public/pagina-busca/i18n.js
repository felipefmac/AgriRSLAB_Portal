document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        "en": {
            "pageTitle": "Search",
            "searchResultsTitle": "Search Results",
            "noTermEntered": "No search term entered.",
            "searchingFor": "Searching for:",
            "nothingFound": "Nothing found.",
            "searchError": "Error while searching.",

            // Category names (plural)
            "categoryNews": "News",
            "categoryArticles": "Articles",
            "categoryProjects": "Projects",
            "categoryJobs": "Jobs",
            "categoryMembers": "Members",

            // Category names (singular - for internal use)
            "typeNews": "News",
            "typeArticle": "Article",
            "typeProject": "Project",
            "typeJob": "Job",
            "typeMember": "Member"
        },
        "pt": {
            "pageTitle": "Busca",
            "searchResultsTitle": "Resultados da busca",
            "noTermEntered": "Nenhum termo inserido.",
            "searchingFor": "Buscando por:",
            "nothingFound": "Nada encontrado.",
            "searchError": "Erro ao buscar.",

            // Category names (plural)
            "categoryNews": "Notícias",
            "categoryArticles": "Artigos",
            "categoryProjects": "Projetos",
            "categoryJobs": "Vagas",
            "categoryMembers": "Membros",

            // Category names (singular - for internal use)
            "typeNews": "Notícia",
            "typeArticle": "Artigo",
            "typeProject": "Projeto",
            "typeJob": "Vaga",
            "typeMember": "Membro"
        }
    };

    window.translations = translations;

    const applyTranslations = (lang) => {
        const effectiveLang = lang || 'pt';

        // Translate elements with data-i18n-key
        document.querySelectorAll('[data-i18n-key]').forEach(element => {
            const key = element.getAttribute('data-i18n-key');
            if (translations[effectiveLang] && translations[effectiveLang][key]) {
                element.textContent = translations[effectiveLang][key];
            }
        });

        // Update document language
        document.documentElement.lang = effectiveLang;
    };

    const currentLanguage = localStorage.getItem('selectedLanguage') || 'pt';
    applyTranslations(currentLanguage);

    window.addEventListener('languageChange', () => {
        const newLang = localStorage.getItem('selectedLanguage') || 'pt';
        applyTranslations(newLang);

        // Trigger search results reload if the search function is available
        if (window.recarregarBusca) {
            window.recarregarBusca();
        }
    });
});
