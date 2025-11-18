document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);

    if (params.has('id')) {
        carregarProjetoUnico(params.get('id'));  // Página detalhe
    } else {
        carregarListaDeProjetos();               // Página lista
        configurarFiltros();
    }
});


// ------------------------------------------
// LISTA DE PROJETOS
// ------------------------------------------

async function carregarListaDeProjetos() {
    try {
        const resposta = await fetch('/api/projetos/publicos');
        const projetos = await resposta.json();

        window.todosProjetos = projetos;
        renderizarProjetos(projetos);
    } catch (erro) {
        console.error('Erro ao carregar projetos:', erro);
    }
}

function renderizarProjetos(lista) {
    const container = document.querySelector('.projetos-galeria');
    const mensagem = document.getElementById('mensagem');

    container.innerHTML = '';

    if (!lista || lista.length === 0) {
        mensagem.style.display = 'block';
        return;
    }

    mensagem.style.display = 'none';

    lista.forEach(proj => {
        const item = document.createElement('a');
        item.classList.add('item-galeria');

        if (proj.fase) item.classList.add(proj.fase);

        // Link para a página detalhe
        item.href = `projeto-detalhe.html?id=${proj.id}`;

        item.innerHTML = `
            <img src="${proj.url_imagem}" alt="${proj.titulo}">
            <div class="overlay-texto">${proj.titulo}</div>
        `;

        container.appendChild(item);
    });
}

function configurarFiltros() {
    const botoes = document.querySelectorAll('.botao-filtro');

    botoes.forEach(botao => {
        botao.addEventListener('click', () => {
            botoes.forEach(b => b.classList.remove('ativo'));
            botao.classList.add('ativo');

            const filtro = botao.getAttribute('data-filtro');

            if (!window.todosProjetos) return;

            if (filtro === 'todos') {
                renderizarProjetos(window.todosProjetos);
            } else {
                const filtrados = window.todosProjetos.filter(
                    proj => proj.fase === filtro
                );
                renderizarProjetos(filtrados);
            }
        });
    });
}
