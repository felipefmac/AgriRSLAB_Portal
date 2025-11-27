document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        "en": {
            "pageTitle": "Contact Us",
            "contactFormTitle": "Contact Us",
            "formNamePlaceholder": "Name",
            "formEmailPlaceholder": "E-mail",
            "formSubjectPlaceholder": "Subject",
            "formMessagePlaceholder": "Write your comment, suggestion, or leave a message for our members.",
            "formSendButton": "Send Message",
            "locationTitle": "Location",
            "addressLine1": "Av. dos Astronautas, 1758 - Jardim da Granja",
            "socialMediaTitle": "Social Media",
            "formSuccess": "Message sent successfully! We will get back to you soon.",
            "formError": "An error occurred while sending your message. Please try again later.",
            "formConnectionError": "Could not send your message at the moment. Please check your connection and try again.",
            "formInvalid": "Please fill in name, e-mail, and message."
        },
        "pt": {
            "pageTitle": "Fale Conosco",
            "contactFormTitle": "Fale Conosco",
            "formNamePlaceholder": "Nome",
            "formEmailPlaceholder": "E-mail",
            "formSubjectPlaceholder": "Assunto",
            "formMessagePlaceholder": "Escreva seu comentário, sugestão ou deixe uma mensagem para nossos integrantes.",
            "formSendButton": "Enviar Mensagem",
            "locationTitle": "Localização",
            "addressLine1": "Av. dos Astronautas, 1758 - Jardim da Granja",
            "socialMediaTitle": "Redes Sociais",
            "formSuccess": "Mensagem enviada com sucesso! Retornaremos em breve.",
            "formError": "Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.",
            "formConnectionError": "Não foi possível enviar sua mensagem no momento. Verifique sua conexão e tente novamente.",
            "formInvalid": "Por favor, preencha nome, e-mail e mensagem."
        }
    };

    // Expõe as traduções para que outros scripts possam usá-las
    window.translations = translations;

    function applyTranslations(lang) {
        const effectiveLang = lang in translations ? lang : 'pt';
        const translationMap = translations[effectiveLang];

        // Traduz o título da página
        document.title = translationMap.pageTitle;

        // Traduz elementos com data-i18n-key
        document.querySelectorAll('[data-i18n-key]').forEach(element => {
            const key = element.getAttribute('data-i18n-key');
            if (translationMap[key]) {
                element.innerHTML = translationMap[key];
            }
        });

        // Traduz placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translationMap[key]) {
                element.setAttribute('placeholder', translationMap[key]);
            }
        });

        document.documentElement.lang = effectiveLang;
    }

    const currentLanguage = localStorage.getItem('selectedLanguage') || 'pt';
    applyTranslations(currentLanguage);

    window.addEventListener('languageChange', () => {
        const newLang = localStorage.getItem('selectedLanguage') || 'pt';
        applyTranslations(newLang);
    });
});