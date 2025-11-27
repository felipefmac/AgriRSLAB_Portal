document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        "en": {
            // Header and Footer are handled by their own scripts, but we can keep keys here if needed.

            // Articles Page
            "articlesTitle": "Articles and Publications",
            "articlesSubtitle": "Explore the scientific research and technical analyses developed by our team.",
            "filterByYear": "Filter by year",
            "filterAllYears": "All years",
            "searchButton": "Search",
            "noArticlesFound": "No articles found with the current criteria.",
            "loadingArticles": "Loading articles...",
            "errorLoading": "Could not load articles at this time. Please try again later.",
            "readMore": "Read more",
            "downloadPDF": "Download PDF",
            "viewAbstract": "View abstract",
            "journal": "Journal",
            "authors": "Authors",
            "year": "Year",
            "page": "Page",

            // Filters
            "filterPublicationType": "Publication Type",
            "filterAuthor": "Author/Member",
            "filterTitleYear": "Title/Year",
            "filterApply": "Apply",
            "filterClear": "Clear",
            "filterTitleYearPlaceholder": "Search by title or year...",
            "filterAuthorPlaceholder": "Search by author/member...",

            "typeArticles": "Articles",
            "typeConference": "Conference Papers (CP)",
            "typeBooks": "Book Chapters (BC)",
            "typeTechnical_notes": "Technical Notes (NT)",
            "noResults": "No results found for the current filters."
        },
        "pt": {
            // Header e Footer são tratados por seus próprios scripts.

            // Página de Artigos
            "articlesTitle": "Artigos e Publicações",
            "articlesSubtitle": "Explore as pesquisas científicas e análises técnicas desenvolvidas por nossa equipe.",
            "filterByYear": "Filtrar por ano",
            "filterAllYears": "Todos os anos",
            "searchButton": "Buscar",
            "noArticlesFound": "Nenhum artigo encontrado com os critérios atuais.",
            "loadingArticles": "Carregando artigos...",
            "errorLoading": "Não foi possível carregar os artigos no momento. Por favor, tente novamente mais tarde.",
            "readMore": "Leia mais",
            "downloadPDF": "Baixar PDF",
            "viewAbstract": "Ver resumo",
            "journal": "Revista",
            "authors": "Autores",
            "year": "Ano",
            "page": "Página",

            // Filtros
            "filterPublicationType": "Tipo de Publicação",
            "filterAuthor": "Autor/Membro",
            "filterTitleYear": "Título/Ano",
            "filterApply": "Aplicar",
            "filterClear": "Limpar",
            "filterTitleYearPlaceholder": "Buscar por título ou ano...",
            "filterAuthorPlaceholder": "Buscar por autor/membro...",
            
            "typeArticles": "Artigos",
            "typeConference": "Artigos de Conferência (AC)",
            "typeBooks": "Capítulos de livros (CL)",
            "typeTechnical_notes": "Notas Técnicas (NT)",
            "noResults": "Nenhum resultado encontrado para os filtros atuais."
        }
    };

    // Expõe as traduções para que outros scripts possam usá-las
    window.translations = translations;

    const applyTranslations = (lang) => {
        // Garante que o idioma padrão seja 'pt' se nenhum for encontrado
        const effectiveLang = lang || 'pt';

        document.querySelectorAll('[data-i18n-key]').forEach(element => {
            const key = element.getAttribute('data-i18n-key');
            if (translations[effectiveLang] && translations[effectiveLang][key]) {
                // Usa innerHTML para permitir tags como <br> se necessário
                element.innerHTML = translations[effectiveLang][key];
            }
        });

        // Traduz atributos como 'placeholder'
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

    // Ouve por mudanças de idioma vindas do header
    window.addEventListener('languageChange', () => {
        const newLang = localStorage.getItem('selectedLanguage') || 'pt';
        applyTranslations(newLang);
    });
});