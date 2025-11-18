// ============================================================================
// CONFIG
// ============================================================================
const API_BASE_URL = 'http://localhost:3000/api/projetos';
const projetosContainer = document.getElementById('container-projetos');

// Modais
const modalCadastro = document.getElementById('modal-cadastro');
const modalAtualizacao = document.getElementById('modal-atualizacao');
const modalDelecao = document.getElementById('modal-delecao');

// Botões / formulários
const btnAbrirCadastro = document.getElementById('btn-abrir-cadastro');
const formCadastro = document.getElementById('form-cadastro');
const formAtualizacao = document.getElementById('form-atualizacao');
const btnConfirmarDelecao = document.getElementById('btn-confirmar-delecao');

// Para guardar o id que vamos deletar
let projetoParaDeletarId = null;

// ============================================================================
// HELPERS
// ============================================================================

function getFullUrl(path) {
    if (path && !path.startsWith('http')) {
        return `http://localhost:3000${path}`;
    }
    return path;
}

function getStatusVisivel(exibir) {
    return exibir
        ? '<span class="status-visible">● Visível</span>'
        : '<span class="status-oculto">● Oculto</span>';
}

function getResumoConteudo(conteudo) {
    if (!conteudo) return 'Sem resumo disponível.';
    let texto = conteudo.trim();
    if (texto.length > 150) texto = texto.slice(0, 150).trim() + '...';
    return texto;
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('custom-toast');
    const toastMessage = document.getElementById('toast-message');

    toastMessage.textContent = message;
    toast.className = '';
    toast.classList.add(type);
    toast.classList.add('show');

    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ============================================================================
// CARDS
// ============================================================================

function criarProjetoCard(projeto) {
    const card = document.createElement('div');

    card.className = `artigo-card ${!projeto.exibir ? 'oculto' : ''}`;
    card.dataset.id = projeto.id;

    const imagemUrl = getFullUrl(
        projeto.url_imagem || '/uploads/projetos/placeholder.png'
    );

    const statusVisivelHtml = getStatusVisivel(!!projeto.exibir);
    const resumo = getResumoConteudo(projeto.conteudo);

    let dataFormatada = 'Não informada';
    if (projeto.data_cadastro) {
        const data = new Date(projeto.data_cadastro);
        if (!isNaN(data.getTime())) {
            dataFormatada = data.toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    }

card.innerHTML = `
    <img src="${imagemUrl}" 
         alt="Capa do Projeto: ${projeto.titulo}" 
         onerror="this.src='https://via.placeholder.com/300x200?text=Sem+Imagem';">

    <div class="card-content">
        <h3>${projeto.titulo}</h3>

        <p><strong>Status:</strong> ${statusVisivelHtml}</p>
        <p><strong>Autores:</strong> ${projeto.autores || 'Não informados'}</p>
        <p><strong>Cadastrado em:</strong> ${dataFormatada}</p>

        <div class="card-actions">
            <button class="btn-secondary btn-abrir-atualizacao"
                    data-id="${projeto.id}">
                Editar
            </button>

            <button class="btn-danger btn-abrir-delecao"
                    data-id="${projeto.id}"
                    data-titulo="${projeto.titulo}">
                Excluir
            </button>
        </div>
    </div>
`;


    return card;
}

// ============================================================================
// LISTAGEM
// ============================================================================

async function carregarProjetos() {
    projetosContainer.innerHTML = '<h2>Carregando Projetos...</h2>';

    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);

        const projetos = await response.json();
        projetosContainer.innerHTML = '';

        if (!projetos || projetos.length === 0) {
            projetosContainer.innerHTML =
                '<h2>Nenhum projeto encontrado. Cadastre o primeiro!</h2>';
            return;
        }

        projetos.forEach(projeto => {
            projetosContainer.appendChild(criarProjetoCard(projeto));
        });

        document.querySelectorAll('.btn-abrir-atualizacao').forEach(btn => {
            btn.addEventListener('click', abrirModalAtualizacao);
        });

        document.querySelectorAll('.btn-abrir-delecao').forEach(btn => {
            btn.addEventListener('click', abrirModalDelecao);
        });

    } catch (erro) {
        console.error('Erro ao carregar projetos:', erro);
        projetosContainer.innerHTML =
            '<h2>❌ Erro ao carregar projetos. Verifique o backend.</h2>';
    }
}

// ============================================================================
// MODAIS
// ============================================================================

function abrirModal(modal) {
    modal.style.display = 'flex';
}

function fecharModais() {
    modalCadastro.style.display = 'none';
    modalAtualizacao.style.display = 'none';
    modalDelecao.style.display = 'none';
}

btnAbrirCadastro.addEventListener('click', () => {
    fecharModais();
    formCadastro.reset();
    abrirModal(modalCadastro);
});

document.querySelectorAll('.close-button').forEach(btn => {
    btn.addEventListener('click', fecharModais);
});

document.getElementById('btn-cancelar-delecao').addEventListener('click', fecharModais);

window.addEventListener('click', (event) => {
    if (
        event.target === modalCadastro ||
        event.target === modalAtualizacao ||
        event.target === modalDelecao
    ) {
        fecharModais();
    }
});

// ============================================================================
// ATUALIZAÇÃO
// ============================================================================

async function abrirModalAtualizacao(event) {
    const id = event.currentTarget.dataset.id;
    if (!id) return;

    try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) throw new Error('Erro ao buscar projeto');

        const projeto = await response.json();

        document.getElementById('edit-id').value = projeto.id;
        document.getElementById('edit-titulo').value = projeto.titulo || '';
        document.getElementById('edit-autores').value = projeto.autores || '';
        document.getElementById('edit-conteudo').value = projeto.conteudo || '';
        document.getElementById('edit-exibir').checked = !!projeto.exibir;

        // Selecionar fase atual
        const selectFase = document.getElementById('edit-fase');
        if (selectFase) selectFase.value = projeto.fase || '';

        // Imagem preview
        const previewImg = document.getElementById('edit-img-preview');
        if (projeto.url_imagem) {
            previewImg.src = getFullUrl(projeto.url_imagem);
            previewImg.style.display = 'block';
        } else {
            previewImg.style.display = 'none';
        }

        abrirModal(modalAtualizacao);

    } catch (erro) {
        console.error('Erro ao abrir modal de atualização:', erro);
        showToast('Erro ao carregar dados do projeto.', 'error');
    }
}

// ============================================================================
// DELEÇÃO
// ============================================================================

function abrirModalDelecao(event) {
    const id = event.currentTarget.dataset.id;
    const titulo = event.currentTarget.dataset.titulo;

    projetoParaDeletarId = id;
    document.getElementById('delete-titulo-confirm').textContent = titulo;

    fecharModais();
    abrirModal(modalDelecao);
}

btnConfirmarDelecao.addEventListener('click', async () => {
    if (!projetoParaDeletarId) return;

    try {
        const response = await fetch(`${API_BASE_URL}/${projetoParaDeletarId}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Erro ao deletar projeto.');

        fecharModais();
        showToast('Projeto deletado com sucesso!', 'success');
        carregarProjetos();

    } catch (erro) {
        console.error('Erro ao deletar projeto:', erro);
        showToast(`Falha ao deletar: ${erro.message}`, 'error');
    }
});

// ============================================================================
// ENVIO DE FORMULÁRIOS
// ============================================================================

async function enviarFormularioComArquivos(formData, method, url) {
    try {
        const response = await fetch(url, {
            method,
            body: formData
        });

        if (!response.ok) {
            let msg = `Erro HTTP: ${response.status}`;
            try {
                const erroJson = await response.json();
                if (erroJson?.mensagem) msg = erroJson.mensagem;
            } catch (_) {}
            throw new Error(msg);
        }

        fecharModais();
        showToast(
            `Projeto ${method === 'POST' ? 'cadastrado' : 'atualizado'} com sucesso!`,
            'success'
        );
        carregarProjetos();

    } catch (erro) {
        console.error('Erro ao enviar formulário:', erro);
        showToast(`Falha na operação: ${erro.message}`, 'error');
    }
}

// Cadastro
formCadastro.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(formCadastro);
    enviarFormularioComArquivos(formData, 'POST', API_BASE_URL);
});

// Atualização
formAtualizacao.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('edit-id').value;
    const formData = new FormData(formAtualizacao);
    enviarFormularioComArquivos(formData, 'PUT', `${API_BASE_URL}/${id}`);
});

// ============================================================================
// PREVIEW DE IMAGEM
// ============================================================================

function previewImage(fileInput, imgPreview) {
    if (!fileInput || !imgPreview) return;

    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            imgPreview.src = e.target.result;
            imgPreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    });
}

previewImage(
    document.getElementById('imagem_cadastro'),
    document.getElementById('cadastro-img-preview')
);

previewImage(
    document.getElementById('edit-imagem'),
    document.getElementById('edit-img-preview')
);

// ============================================================================
// INIT
// ============================================================================
document.addEventListener('DOMContentLoaded', carregarProjetos);
