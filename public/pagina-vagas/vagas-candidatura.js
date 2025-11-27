/**
 * Exibe mensagem de sucesso ou erro no formulário
 */
function showMessage(msgContainer, message, type) {
    msgContainer.textContent = message;
    msgContainer.className = `form-message ${type}`;
    msgContainer.style.display = 'block';
    
    // Oculta a mensagem após 5 segundos
    setTimeout(() => { msgContainer.style.display = 'none'; }, 5000);
}

const customAlert = (msgContainer, message, isError = false) => {
    showMessage(msgContainer, message, isError ? 'error' : 'success');
};

/**
 * Retorna o texto no idioma correto (PT ou EN).
 */
function getTexto(item, campo) {
    const lang = localStorage.getItem('selectedLanguage') || 'pt';

    // Se for inglês E existir tradução, retorna inglês. Senão, retorna PT (ou base).
    if (lang === 'en' && item[campo + '_en']) {
        return item[campo + '_en'];
    }
    return item[campo] || item[campo + '_pt']; 
}

// =====================================================================
// 1. CARREGAR DADOS DA VAGA (Do URL e do Backend)
// =====================================================================
async function carregarVaga() {
    const params = new URLSearchParams(window.location.search);
    // Pega o ID da vaga a ser carregada (ex: vagas-candidatura.html?id=1)
    const id = params.get("id");

    if (!id) {
        console.error("ID da vaga não encontrado na URL.");
        const container = document.querySelector(".vacancy-canditadura");
        if(container) container.innerHTML = "<p>Erro: ID da vaga não fornecido na URL.</p>";
        return;
    }

    try {
        const resposta = await fetch(`/api/vagas/${id}`);
        
        if (!resposta.ok) {
            throw new Error(`Erro HTTP ${resposta.status}`);
        }

        const vaga = await resposta.json();

        if (!vaga || vaga.mensagem === "Vaga não encontrada.") {
            document.querySelector(".vacancy-canditadura").innerHTML = "<p>Vaga não encontrada.</p>";
            return;
        }

        // --- PREENCHIMENTO DOS DADOS ---
        
        // 1. Título e Descrição (com suporte a idioma)
        document.getElementById("vaga-titulo").textContent = getTexto(vaga, 'titulo');
        document.getElementById("vaga-descricao").textContent = getTexto(vaga, 'descricao');

        // 2. Requisitos
        const lang = localStorage.getItem('selectedLanguage') || 'pt';
        
        // Decide qual array usar
        let requisitos = vaga.requisitos;
        if (lang === 'en' && vaga.requisitos_en && Array.isArray(vaga.requisitos_en)) {
            requisitos = vaga.requisitos_en;
        }

        if (Array.isArray(requisitos) && requisitos.length > 0) {
            document.getElementById("vaga-requisitos").innerHTML =
                requisitos.map(req => `<li>${req}</li>`).join("");
        } else {
            document.getElementById("vaga-requisitos").innerHTML = "<li>Requisitos não listados.</li>";
        }

        // 3. Benefícios
        let beneficios = vaga.beneficios;
        if (lang === 'en' && vaga.beneficios_en && Array.isArray(vaga.beneficios_en)) {
            beneficios = vaga.beneficios_en;
        }

        if (Array.isArray(beneficios) && beneficios.length > 0) {
            document.getElementById("vaga-beneficios").innerHTML =
                beneficios.map(b => `<li>${b}</li>`).join("");
        } else {
            document.getElementById("vaga-beneficios").innerHTML = "<li>Benefícios não listados.</li>";
        }

    } catch (erro) {
        console.error("Erro ao carregar vaga:", erro);
        const container = document.querySelector(".vacancy-canditadura");
        if(container) container.innerHTML = "<p>Erro ao carregar detalhes da vaga. Verifique a conexão com o servidor.</p>";
    }
}

function inicializarFormulario() {
    const btnSubmit = document.getElementById("btn-candidatura-submit");
    const msgContainer = document.getElementById("candidatura-message");
    
    if (!btnSubmit || !msgContainer) {
        console.warn("Elementos essenciais do formulário não encontrados.");
        return; 
    }

    const form = btnSubmit.closest('form'); 
    
    if (!form) {
        console.warn("Formulário não encontrado.");
        return; 
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Impede a navegação padrão

        const formData = new FormData(form);

        // Validação básica do lado do cliente
        const nome = formData.get('nome')?.trim();
        const email = formData.get('email')?.trim();

        msgContainer.style.display = 'none';

        if (!nome || !email) {
            customAlert(msgContainer, "Por favor, preencha nome e e-mail.", true);
            return;
        }

        btnSubmit.classList.add('loading');

        try {
            // Requisição de envio
            const resposta = await fetch("/api/email/candidatura", {
                method: "POST",
                body: formData 
            });

            const dados = await resposta.json().catch(() => ({}));

            if (resposta.ok) {
                customAlert(msgContainer, dados.mensagem || "Candidatura enviada com sucesso!", false);
                form.reset();
                
                // Resetar o texto do input file
                const fileNameSpan = document.getElementById('file-name');
                if (fileNameSpan && traducoes && traducoes['nenhum_arquivo']) {
                    const lang = localStorage.getItem('selectedLanguage') || 'pt';
                    fileNameSpan.textContent = traducoes['nenhum_arquivo'][lang];
                }
            } else {
                customAlert(
                    msgContainer,
                    dados.mensagem || "Ocorreu um erro ao enviar sua candidatura.",
                    true
                );
            }
        } catch (erro) {
            console.error("Erro ao enviar candidatura:", erro);
            customAlert(
                msgContainer,
                "Erro de conexão. Tente novamente.",
                true
            );
        } finally {
            btnSubmit.classList.remove('loading');
        }
    });
}

// =====================================================================
// TRADUÇÕES ESTÁTICAS (Mantido igual ao original)
// =====================================================================
const traducoes = {
    'oportunidades_trabalho': { 'pt': '💼 Oportunidades de Trabalho', 'en': '💼 Job Opportunities' },
    'detalhes_vaga': { 'pt': 'Detalhes da Vaga:', 'en': 'Job Details:' },
    'descricao_label': { 'pt': 'Descrição:', 'en': 'Description:' },
    'requisitos_label': { 'pt': 'Requisitos:', 'en': 'Requirements:' },
    'beneficios_label': { 'pt': 'Benefícios:', 'en': 'Benefits:' },
    'cultura_organizacional': { 'pt': '🏛️ Cultura Organizacional', 'en': '🏛️ Organizational Culture' },
    'cultura_intro': { 'pt': 'Na AGRIRS LAB · INPE, promovemos um ambiente de trabalho baseado em:', 'en': 'At AGRIRS LAB · INPE, we promote a work environment based on:' },
    'cultura_colaboracao': { 'pt': '<strong>Colaboração:</strong> Trabalhamos em equipe para alcançar objetivos científicos e tecnológicos.', 'en': '<strong>Collaboration:</strong> We work as a team to achieve scientific and technological goals.' },
    'cultura_inovacao': { 'pt': '<strong>Inovação:</strong> Estimulamos ideias novas e soluções criativas para desafios ambientais.', 'en': '<strong>Innovation:</strong> We stimulate new ideas and creative solutions for environmental challenges.' },
    'cultura_diversidade': { 'pt': '<strong>Diversidade:</strong> Valorizamos diferentes perspectivas e experiências.', 'en': '<strong>Diversity:</strong> We value different perspectives and experiences.' },
    'cultura_desenvolvimento': { 'pt': '<strong>Desenvolvimento:</strong> Incentivamos o crescimento profissional e pessoal dos nossos colaboradores.', 'en': '<strong>Development:</strong> We encourage the professional and personal growth of our collaborators.' },
    'envie_candidatura': { 'pt': '✉️ Envie sua Candidatura', 'en': '✉️ Send your Application' },
    'label_nome': { 'pt': 'Nome*', 'en': 'Name*' },
    'label_email': { 'pt': 'E-mail*', 'en': 'E-mail*' },
    'label_telefone': { 'pt': 'Telefone', 'en': 'Phone' },
    'label_lattes': { 'pt': 'Lattes, Currículo ou LinkedIn', 'en': 'Lattes, Resume or LinkedIn' },
    'label_cv': { 'pt': 'Anexar Currículo (PDF ou DOC)', 'en': 'Attach Resume (PDF or DOC)' },
    'label_resumo': { 'pt': 'Resumo de Experiência', 'en': 'Experience Summary' },
    'placeholder_resumo': { 'pt': 'Conte, em poucas linhas, suas experiências mais relevantes...', 'en': 'Tell us, in a few lines, your most relevant experiences...' },
    'btn_confirmar': { 'pt': 'Confirmar Candidatura', 'en': 'Confirm Application' },
    'btn_escolher_arquivo': { 'pt': 'Escolher arquivo', 'en': 'Choose file' },
    'nenhum_arquivo': { 'pt': 'Nenhum arquivo escolhido', 'en': 'No file chosen' }
};

function traduzirPagina() {
    const lang = localStorage.getItem('selectedLanguage') || 'pt';

    document.querySelectorAll('[data-i18n]').forEach(elemento => {
        const chave = elemento.getAttribute('data-i18n');

        // Lógica especial para o nome do arquivo: só traduz se NÃO tiver arquivo selecionado
        if (chave === 'nenhum_arquivo') {
            const fileInput = document.getElementById('cv-upload');
            if (fileInput && fileInput.files.length > 0) {
                return; 
            }
        }

        if (traducoes[chave] && traducoes[chave][lang]) {
            if (elemento.tagName === 'INPUT' || elemento.tagName === 'TEXTAREA') {
                if (elemento.hasAttribute('placeholder')) {
                    elemento.placeholder = traducoes[chave][lang];
                }
            } else {
                elemento.innerHTML = traducoes[chave][lang];
            }
        }
    });
}

function inicializarFileInput() {
    const fileInput = document.getElementById('cv-upload');
    const fileNameSpan = document.getElementById('file-name');

    if (fileInput && fileNameSpan) {
        fileInput.addEventListener('change', function () {
            if (this.files && this.files.length > 0) {
                fileNameSpan.textContent = this.files[0].name;
            } else {
                const lang = localStorage.getItem('selectedLanguage') || 'pt';
                fileNameSpan.textContent = traducoes['nenhum_arquivo'][lang];
            }
        });
    }
}

function inicializarPagina() {
    // Carrega os dados da vaga (async)
    carregarVaga();

    // Configura os listeners do formulário (sync)
    inicializarFormulario();

    // Configura o input de arquivo customizado
    inicializarFileInput();

    // Traduz a página inicialmente
    traduzirPagina();

    // Ouve mudanças de idioma
    window.addEventListener('languageChange', () => {
        traduzirPagina();
        carregarVaga(); 
    });
}

document.addEventListener("DOMContentLoaded", inicializarPagina);