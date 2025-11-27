document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        "en": {
            // Members Page
            "membersTitle": "Members",
            "membersSubtitle": "Meet the researchers, fellows, and collaborators who are part of AgriRS Lab.",

            // Search/Filter
            "searchPlaceholder": "Search by name or area of expertise...",
            "searchButton": "Search",

            // Member Categories
            "researchersTitle": "Researchers",
            "fellowsTitle": "Fellows & Students",
            "alumniTitle": "Alumni",

            // New sections
            "meetTeamTitle": "Meet Our Team",
            "meetTeamDescription": "The members of AgriRS Lab work together to advance environmental and atmospheric research. Coordination, Researchers, PhD Students, Master's Students, and Fellows.",
            "joinTeamTitle": "Join Our Team!",
            "joinTeamSubtitle": "Connect with researchers, follow innovative projects, and get access to exclusive content and experiences.",
            "joinTeamButton": "Click here and become a member!",

            // Member Card
            "lattesButton": "Lattes",
            "linkedinButton": "LinkedIn",
            "emailButton": "E-mail",
            "noMembersInCategory": "No members in this category at the moment.",
            "roleCoordinator": "Researcher/ Coordinator",
            "roleResearcher": "Associate Researcher",
            "rolePhd": "PhD Student",
            "roleMsc": "Master's Student",
            "roleFellow": "Fellow",
            "viewButton": "VIEW",
            "curriculumButton": "CURRICULUM",
            // Status Messages
            "loadingMembers": "Loading members...",
            "errorLoading": "Could not load members at this time. Please try again later."
        },
        "pt": {
            // Página de Membros
            "membersTitle": "Membros",
            "membersSubtitle": "Conheça os pesquisadores, bolsistas e colaboradores que fazem parte do AgriRS Lab.",

            // Busca/Filtro
            "searchPlaceholder": "Buscar por nome ou área de atuação...",
            "searchButton": "Buscar",

            // Categorias de Membros
            "researchersTitle": "Pesquisadores",
            "fellowsTitle": "Bolsistas e Estudantes",
            "alumniTitle": "Ex-membros",

            // Novas seções
            "meetTeamTitle": "Conheça nossa Equipe",
            "meetTeamDescription": "Os membros do AGRiRS Lab trabalham juntos para avançar nas pesquisas ambientais e atmosféricas. Coordenação, Pesquisadores, Doutorandos, Mestrandos e Bolsistas.",
            "joinTeamTitle": "Junte-se ao nosso time!",
            "joinTeamSubtitle": "Conecte-se com pesquisadores, acompanhe projetos inovadores e tenha acesso a conteúdos e experiências exclusivas.",
            "joinTeamButton": "Clique aqui e se torne um membro!",

            // Card do Membro
            "lattesButton": "Lattes",
            "linkedinButton": "LinkedIn",
            "emailButton": "E-mail",
            "noMembersInCategory": "Nenhum membro nesta categoria no momento.",
            "roleCoordinator": "Pesquisador(a)/ Coordenador(a)",
            "roleResearcher": "Pesquisador(a) Associado(a)",
            "rolePhd": "Doutorando(a)",
            "roleMsc": "Mestrando(a)",
            "roleFellow": "Bolsista",
            "viewButton": "VER",
            "curriculumButton": "CURRÍCULO",
            // Mensagens de Status
            "loadingMembers": "Carregando membros...",
            "errorLoading": "Não foi possível carregar os membros no momento. Por favor, tente novamente mais tarde."
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
        document.documentElement.lang = effectiveLang;
    };

    const currentLanguage = localStorage.getItem('selectedLanguage') || 'pt';
    applyTranslations(currentLanguage);

    window.addEventListener('languageChange', () => {
        const newLang = localStorage.getItem('selectedLanguage') || 'pt';
        applyTranslations(newLang);
        // Após traduzir o estático, recarrega os membros dinâmicos
        if (window.inicializarMembros) {
            window.inicializarMembros();
        }
    });
});