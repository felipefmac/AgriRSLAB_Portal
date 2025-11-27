document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        "en": {
            "jobsTitle": "Join Our Team",
            "jobsSubtitle": "We are looking for talent passionate about technology and innovation to transform agriculture.",
            "openPositionsTitle": "Open Positions",
            "noOpenings": "There are no open positions at the moment. Follow our social media to stay updated on future opportunities!",
            "jobType": "Type",
            "jobLocation": "Location",
            "jobApply": "Apply",
            "mastersPhdCallNotice": "Master's and PhD calls vary according to the PGSER public notice.",
            "mastersPhdTitle": "Master's and PhD in Remote Sensing applied to Agriculture",
            "mastersPhdDescription": "AgriRS Lab belongs to INPE's Remote Sensing Division and develops research and development in geoinformatics and remote sensing for agriculture...",
            "viewApplicationsButton": "View applications",
            "workOpportunitiesTitle": "🌱 Job Opportunities",

            "applicationsTitle": "📄 Applications for Master's and PhD",
            "applicationsDescription": "Applications are centralized by the Graduate Program in Remote Sensing at INPE. Access the link for public notices and guidelines.",
            "applicationsButton": "Open PGSER applications and notices page",
            "applicationsContact": "Program office contact:",
            "researchTopicsTitle": "📊 Research lines and themes",
            "topic1Title": "Precision agriculture",
            "topic1Desc": "Spatial variability, field sensors, and integration with machine data.",
            "topic2Title": "Orbital and aerial imagery",
            "topic2Desc": "Use of satellites and UAVs for crop and phenology monitoring.",
            "topic3Title": "Processing and modeling",
            "topic3Desc": "Image processing, time series, and machine learning applied to agriculture.",
            "researchTopicsNote": "The specific lines of PGSER include areas such as remote sensing applied to agriculture, image processing, and geoprocessing. Check the program's page for the complete and updated list.",
            "howToApplyTitle": "📥 How to apply",
            "step1Title": "1. Read the PGSER notice",
            "step1Desc": "Check requirements, schedule, and documents. INPE's PGSER publishes the notices on the official website.",
            "step2Title": "2. Prepare the application",
            "step2List": "<li>Academic transcript and diploma or declaration of completion</li><li>Lattes CV</li><li>Motivation letter</li><li>Recommendation letters (when required)</li><li>Preliminary project according to the notice</li>",
            "step3Title": "3. Submit and follow up",
            "step3Desc": "Submit through the system indicated in the notice and follow up on interviews or tests. Results are published on the PGSER website.",
            "howToApplyNote": "More details on lines, selection, and contacts are on the INPE PGSER page.",

            // From javascript-vagas.js
            "requirements": "Requirements:",
            "benefits": "Benefits:",
            "noVacancies": "No vacancies available at the moment.",
            "errorLoadingVacancies": "Error loading vacancies.",

            // From vagas-candidatura.js
            "pageTitleCandidatura": "Apply for Job",
            "jobDetails": "Job Details:",
            "descriptionLabel": "Description:",
            "organizationalCulture": "🏛️ Organizational Culture",
            "cultureIntro": "At AGRIRS LAB · INPE, we promote a work environment based on:",
            "cultureCollaboration": "<strong>Collaboration:</strong> We work as a team to achieve scientific and technological goals.",
            "cultureInnovation": "<strong>Innovation:</strong> We stimulate new ideas and creative solutions for environmental challenges.",
            "cultureDiversity": "<strong>Diversity:</strong> We value different perspectives and experiences.",
            "cultureDevelopment": "<strong>Development:</strong> We encourage the professional and personal growth of our collaborators.",
            "sendApplication": "✉️ Send your Application",
            "labelName": "Name*",
            "labelEmail": "E-mail*",
            "labelPhone": "Phone",
            "labelLattes": "Lattes, Resume or LinkedIn",
            "labelCv": "Attach Resume (PDF or DOC)",
            "labelSummary": "Experience Summary",
            "placeholderSummary": "Tell us, in a few lines, your most relevant experiences...",
            "btnConfirm": "Confirm Application",
            "btnChooseFile": "Choose file",
            "noFileChosen": "No file chosen",
            "errorNoId": "Error: Job ID not provided in URL.",
            "errorNotFound": "Job not found.",
            "errorLoadingDetails": "Error loading job details. Please check the server connection.",
            "errorFillFields": "Please fill in name and e-mail.",
            "formSuccess": "Application sent successfully!",
            "formError": "An error occurred while sending your application. Please try again later.",
            "formConnectionError": "Could not send your application at the moment. Please check your connection and try again."
        },
        "pt": {
            "jobsTitle": "Junte-se à Nossa Equipe",
            "jobsSubtitle": "Buscamos talentos apaixonados por tecnologia e inovação para transformar o agronegócio.",
            "openPositionsTitle": "Vagas Abertas",
            "noOpenings": "Não há vagas abertas no momento. Acompanhe nossas redes sociais para saber de futuras oportunidades!",
            "jobType": "Tipo",
            "jobLocation": "Local",
            "jobApply": "Candidatar-se",
            "mastersPhdCallNotice": "Chamadas de Mestrado e Doutorado variam conforme edital do PGSER.",
            "mastersPhdTitle": "Mestrado e Doutorado em Sensoriamento Remoto aplicado à Agricultura",
            "mastersPhdDescription": "O AgriRS Lab pertence à Divisão de Sensoriamento Remoto do INPE e desenvolve pesquisa e desenvolvimento em geoinformática e sensoriamento remoto para agricultura...",
            "viewApplicationsButton": "Ver inscrições",
            "workOpportunitiesTitle": "🌱 Oportunidades de Trabalho",

            "applicationsTitle": "📄 Inscrições para Mestrado e Doutorado",
            "applicationsDescription": "As inscrições são centralizadas pelo Programa de Pós Graduação em Sensoriamento Remoto do INPE. Acesse o link para editais e orientações.",
            "applicationsButton": "Abrir página de inscrições e editais do PGSER",
            "applicationsContact": "Contato da secretaria do programa:",
            "researchTopicsTitle": "📊 Linhas de pesquisa e temas",
            "topic1Title": "Agricultura de precisão",
            "topic1Desc": "Variabilidade espacial, sensores em campo e integração com dados de máquinas.",
            "topic2Title": "Imagens orbitais e aéreas",
            "topic2Desc": "Uso de satélites e VANTs para monitoramento de culturas e fenologia.",
            "topic3Title": "Processamento e modelagem",
            "topic3Desc": "Processamento de imagens, séries temporais e aprendizado de máquina aplicado ao agro.",
            "researchTopicsNote": "As linhas específicas do PGSER incluem áreas como sensoriamento remoto aplicado à agricultura, processamento de imagens e geoprocessamento. Consulte a página do programa para a lista completa e atualizada.",
            "howToApplyTitle": "📥 Como ingressar",
            "step1Title": "1. Leia o edital do PGSER",
            "step1Desc": "Verifique requisitos, cronograma e documentos. O PGSER do INPE publica os editais no site oficial.",
            "step2Title": "2. Prepare a inscrição",
            "step2List": "<li>Histórico e diploma ou declaração de concluinte</li><li>Currículo Lattes</li><li>Carta de motivação</li><li>Cartas de recomendação (quando exigido)</li><li>Anteprojeto conforme edital</li>",
            "step3Title": "3. Submeta e acompanhe",
            "step3Desc": "Envie pelo sistema indicado no edital e acompanhe entrevistas ou provas. Resultados são divulgados no site do PGSER.",
            "howToApplyNote": "Mais detalhes sobre linhas, seleção e contatos estão na página do PGSER do INPE.",

            // De javascript-vagas.js
            "requirements": "Requisitos:",
            "benefits": "Benefícios:",
            "noVacancies": "Nenhuma vaga disponível no momento.",
            "errorLoadingVacancies": "Erro ao carregar vagas.",

            // De vagas-candidatura.js
            "pageTitleCandidatura": "Candidatura para Vaga",
            "jobDetails": "Detalhes da Vaga:",
            "descriptionLabel": "Descrição:",
            "organizationalCulture": "🏛️ Cultura Organizacional",
            "cultureIntro": "Na AGRIRS LAB · INPE, promovemos um ambiente de trabalho baseado em:",
            "cultureCollaboration": "<strong>Colaboração:</strong> Trabalhamos em equipe para alcançar objetivos científicos e tecnológicos.",
            "cultureInnovation": "<strong>Inovação:</strong> Estimulamos ideias novas e soluções criativas para desafios ambientais.",
            "cultureDiversity": "<strong>Diversidade:</strong> Valorizamos diferentes perspectivas e experiências.",
            "cultureDevelopment": "<strong>Desenvolvimento:</strong> Incentivamos o crescimento profissional e pessoal dos nossos colaboradores.",
            "sendApplication": "✉️ Envie sua Candidatura",
            "labelName": "Nome*",
            "labelEmail": "E-mail*",
            "labelPhone": "Telefone",
            "labelLattes": "Lattes, Currículo ou LinkedIn",
            "labelCv": "Anexar Currículo (PDF ou DOC)",
            "labelSummary": "Resumo de Experiência",
            "placeholderSummary": "Conte, em poucas linhas, suas experiências mais relevantes...",
            "btnConfirm": "Confirmar Candidatura",
            "btnChooseFile": "Escolher arquivo",
            "noFileChosen": "Nenhum arquivo escolhido",
            "errorNoId": "Erro: ID da vaga não fornecido na URL.",
            "errorNotFound": "Vaga não encontrada.",
            "errorLoadingDetails": "Erro ao carregar detalhes da vaga. Verifique a conexão com o servidor.",
            "errorFillFields": "Por favor, preencha nome e e-mail.",
            "formSuccess": "Candidatura enviada com sucesso!",
            "formError": "Ocorreu um erro ao enviar sua candidatura. Tente novamente mais tarde.",
            "formConnectionError": "Não foi possível enviar sua candidatura no momento. Verifique sua conexão e tente novamente."
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
        // Dispara um evento para que outros scripts saibam da mudança.
        // Isso garante que os conteúdos dinâmicos sejam recarregados com o novo idioma.
        if (window.carregarVagas) {
            carregarVagas();
        }
        if (window.inicializarPagina) {
            // O 'true' indica que é uma mudança de idioma, para não reinicializar tudo.
            inicializarPagina(true);
        }
    });
});