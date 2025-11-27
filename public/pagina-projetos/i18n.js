document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        "en": {
            "projectsSubtitle": "Connecting Innovation and Sustainability: Discover the Projects of AgriRSLab",
            "filterAll": "All",
            "filterInProgress": "In Progress",
            "filterCompleted": "Completed",
            "searchButton": "Search",
            "noProjectsFound": "No projects found with the current criteria.",
            "loadingProjects": "Loading projects...",
            "errorLoading": "Could not load projects at this time.",
            "readMore": "Read more"
        },
        "pt": {
            "projectsSubtitle": "Conectando Inovação e Sustentabilidade: Conheça os Projetos do AgriRSLab",
            "filterAll": "Todos",
            "filterInProgress": "Em andamento",
            "filterCompleted": "Finalizados",
            "searchButton": "Buscar",
            "noProjectsFound": "Nenhum projeto encontrado com os critérios atuais.",
            "loadingProjects": "Carregando projetos...",
            "errorLoading": "Não foi possível carregar os projetos no momento.",
            "readMore": "Leia mais"
        }
    };

    window.translations = translations;

    const applyTranslations = (lang) => {
        const effectiveLang = lang || 'pt';

        document.querySelectorAll('[data-i18n-key]').forEach(element => {
            const key = element.getAttribute('data-i18n-key');
            if (translations[effectiveLang] && translations[effectiveLang][key]) {
                element.innerHTML = translations[effectiveLang][key];
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translations[effectiveLang] && translations[effectiveLang][key]) {
                element.setAttribute('placeholder', translations[effectiveLang][key]);
            }
        });

        document.documentElement.lang = effectiveLang;
    };

    const currentLanguage = localStorage.getItem('selectedLanguage') || 'pt';
    applyTranslations(currentLanguage);

    window.addEventListener('languageChange', () => {
        const newLang = localStorage.getItem('selectedLanguage') || 'pt';
        applyTranslations(newLang);
    });
});