document.addEventListener('DOMContentLoaded', () => {
    carregarProjetos();
    configurarFiltros();
});

async function carregarProjetos() {
    try {
        // Pega o idioma do localStorage para fazer a requisição correta
        const lang = localStorage.getItem('site_lang') || 'pt';
        const resposta = await fetch(`/api/projetos/publicos?lang=${lang}`);
        const projetos = await resposta.json();

        // salva para filtros
        window.todosProjetos = projetos;

        renderizarProjetos(projetos);

    } catch (erro) {
        console.error("Erro ao carregar projetos:", erro);
    }
}

// ===============================================
// RENDERIZA LISTA IGUAL AO MODELO ESTÁTICO
// ===============================================
// Função auxiliar para pegar texto baseado no idioma
function getTexto(item, campo) {
    // O backend agora envia o campo já traduzido. Apenas retornamos o valor.
    return item[campo];
}

function renderizarProjetos(lista) {
    const container = document.getElementById('lista-projetos');
    const mensagem = document.getElementById('mensagem');

    if (!container) return;

    container.innerHTML = '';

    if (!lista || lista.length === 0) {
        mensagem.style.display = 'block';
        return;
    }

    mensagem.style.display = 'none';

    lista.forEach((proj, index) => {

        // Pega o título (já traduzido pelo backend) para cada projeto
        const tituloExibicao = getTexto(proj, 'titulo');

        // destaque = primeiro item
        const destaqueClasse = index === 0 ? 'item-destaque' : '';

        const a = document.createElement('a');
        a.href = `projeto-detalhe.html?id=${proj.id}`;
        a.className = `item-galeria ${destaqueClasse} ${proj.fase || ''}`;

        a.innerHTML = `
            <img src="${proj.url_imagem}" alt="${tituloExibicao}">
            <div class="overlay-texto">${tituloExibicao}</div>
        `;

        container.appendChild(a);
    });
}

// ===============================================
// FILTROS (igual ao antigo)
// ===============================================
function configurarFiltros() {
    const botoes = document.querySelectorAll('.botao-filtro');

    botoes.forEach(botao => {
        botao.addEventListener('click', () => {
            botoes.forEach(b => b.classList.remove('ativo'));
            botao.classList.add('ativo');

            const filtro = botao.getAttribute('data-filtro');

            if (filtro === 'todos') {
                renderizarProjetos(window.todosProjetos);
                return;
            }

            const filtrados = window.todosProjetos.filter(
                proj => proj.fase === filtro
            );

            renderizarProjetos(filtrados);
        });
    });
}
