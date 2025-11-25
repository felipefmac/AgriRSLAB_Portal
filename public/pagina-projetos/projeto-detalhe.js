document.addEventListener('DOMContentLoaded', carregarProjeto);

/**
 * Retorna o texto no idioma correto (PT ou EN).
 */
function getTexto(item, campo) {
    const lang = localStorage.getItem('selectedLanguage') || 'pt';

    // Se for inglês E existir tradução, retorna inglês. Senão, retorna PT.
    if (lang === 'en' && item[campo + '_en']) {
        return item[campo + '_en'];
    }
    return item[campo] || item[campo + '_pt']; // Fallback para campo base ou campo _pt
}

/**
 * Retorna mensagens traduzidas conforme o idioma selecionado.
 */
function getMensagem(chave) {
    const lang = localStorage.getItem('selectedLanguage') || 'pt';
    const mensagens = {
        'autores_nao_informados': {
            'pt': 'Autores não informados',
            'en': 'Authors not informed'
        }
    };
    return mensagens[chave] ? mensagens[chave][lang] : '';
}

async function carregarProjeto() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (!id) {
        document.querySelector('.detalhes_projetos').innerHTML =
            '<p>Projeto não encontrado.</p>';
        return;
    }

    try {
        const resposta = await fetch(`/api/projetos/${id}`);
        const projeto = await resposta.json();

        console.log("DETALHE CARREGADO:", projeto);

        if (!projeto || projeto.erro) {
            document.querySelector('.detalhes_projetos').innerHTML =
                '<p>Projeto não encontrado.</p>';
            return;
        }

        // Título do navegador
        document.getElementById('titulo-pagina').textContent = getTexto(projeto, 'titulo');

        // Título
        document.getElementById('titulo').textContent = getTexto(projeto, 'titulo');

        // Autores (pulando linha por quebra de vírgula)
        document.getElementById('autores').innerHTML =
            projeto.autores ? projeto.autores.replace(/,/g, '<br>') : getMensagem('autores_nao_informados');

        // Conteúdo
        document.getElementById('conteudo').innerHTML = getTexto(projeto, 'conteudo');

        // Imagem
        if (projeto.url_imagem) {
            document.getElementById('imagem').src = projeto.url_imagem;
            document.getElementById('imagem').alt = getTexto(projeto, 'titulo');
        } else {
            document.getElementById('imagem').style.display = 'none';
        }

    } catch (erro) {
        console.error("Erro ao carregar detalhes:", erro);
    }
}
