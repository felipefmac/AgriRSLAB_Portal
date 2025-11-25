document.addEventListener('DOMContentLoaded', carregarPaginaNoticia);

function formatarData(dataISO) {
    if (!dataISO) return 'Data não informada';
    const data = new Date(dataISO);
    const dia = String(data.getUTCDate()).padStart(2, '0');
    const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
    const ano = data.getUTCFullYear();
    return `${dia}/${mes}/${ano}`;
}

function configurarCompartilhamento() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    
    const setHref = (id, link) => {
        const el = document.getElementById(id);
        if (el) el.href = link;
    };

    setHref("shareWhatsApp", `https://api.whatsapp.com/send?text=${title}%20${url}`);
    setHref("shareEmail", `mailto:?subject=${title}&body=Veja%20essa%20matéria:%20${url}`);
    setHref("shareLinkedIn", `https://www.linkedin.com/sharing/share-offsite/?url=${url}`);
}

async function carregarNoticiaDetalhe(id) {
    try {
        const resposta = await fetch(`/api/noticias/${id}`);
        if (resposta.status === 404) {
            document.getElementById('noticia-titulo').textContent = 'Notícia não encontrada.';
            document.getElementById('noticia-data').textContent = '';
            document.getElementById('noticia-texto').innerHTML = '<p class="texto-conteudo">A notícia que você procura não existe ou foi removida.</p>';
            return null;
        }
        if (!resposta.ok) {
            throw new Error(`Erro HTTP ${resposta.status}`);
        }
        
        const noticia = await resposta.json();
        
        // Preenche o conteúdo principal
        document.getElementById('page-title').textContent = noticia.titulo;
        document.getElementById('noticia-titulo').textContent = noticia.titulo;
        document.getElementById('noticia-data').textContent = formatarData(noticia.data_criacao);
        
        const subtituloElement = document.getElementById('noticia-subtitulo');
        if (noticia.subtitulo) {
             subtituloElement.textContent = noticia.subtitulo;
             subtituloElement.style.display = 'block';
        } else {
            subtituloElement.style.display = 'none';
        }
        
        // O texto completo deve ser inserido em seu bloco
        document.getElementById('noticia-texto').innerHTML = `<p class="texto-conteudo">${noticia.texto || 'Conteúdo em breve.'}</p>`;
        
        // Imagem
        const imagemElement = document.getElementById('noticia-imagem');
        if (noticia.url_imagem) {
            imagemElement.src = noticia.url_imagem.startsWith('/uploads') ? noticia.url_imagem : `../${noticia.url_imagem}`;
            imagemElement.alt = noticia.titulo;
            imagemElement.style.display = 'block';
        } else {
            imagemElement.style.display = 'none';
        }

        configurarCompartilhamento();
        return noticia;

    } catch (erro) {
        console.error("Erro ao carregar notícia:", erro);
        document.getElementById('noticia-titulo').textContent = 'Erro ao carregar notícia.';
        document.getElementById('noticia-data').textContent = 'Verifique a conexão com o servidor.';
        document.getElementById('noticia-subtitulo').style.display = 'none';
        document.getElementById('noticia-texto').innerHTML = '<p class="texto-conteudo">Falha ao buscar conteúdo.</p>';
        return null;
    }
}

async function carregarSugeridas(idAtual) {
    const container = document.getElementById('sugeridas-container');
    container.innerHTML = '<p>Carregando sugestões...</p>';

    if (!idAtual) {
        container.innerHTML = '<p>Não é possível carregar sugestões sem o ID da notícia atual.</p>';
        return;
    }
    
    try {
        const resposta = await fetch(`/api/noticias/sugeridas?idAtual=${idAtual}`);
        
       if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }
        
        const sugeridas = await resposta.json();
        container.innerHTML = ''; 

        if (sugeridas.length === 0) {
            container.innerHTML = '<p>Nenhuma outra notícia sugerida no momento.</p>';
            return;
        }

        sugeridas.forEach(noticia => {
            const linkHref = noticia.url_noticia 
                ? noticia.url_noticia 
                : `noticias2.html?id=${noticia.id_noticias}`;
            
            const targetAttr = noticia.url_noticia ? '_blank' : '_self';

            const htmlCard = `
                <a href="${linkHref}" target="${targetAttr}">
                    <div class="noticia-sugerida">
                        <img src="${noticia.url_imagem}" alt="${noticia.titulo}" onerror="this.style.display='none'">
                        <div>
                            <h4>${noticia.titulo}</h4>
                            <p>${noticia.subtitulo || noticia.texto.substring(0, 80) + '...'}</p>
                            <span>${formatarData(noticia.data_criacao)}</span>
                            <p class="continuar-lendo">Ler mais</p>
                        </div>
                    </div>
                </a>
            `;
            container.insertAdjacentHTML('beforeend', htmlCard);
        });

    } catch (erro) {
        console.error("Erro ao carregar sugestões:", erro);
        container.innerHTML = '<p>Falha ao carregar sugestões.</p>';
    }
}


async function carregarPaginaNoticia() {
    // 1. Pega o ID da URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    
    if (!id) {
        document.getElementById('noticia-titulo').textContent = 'Erro: ID da notícia não fornecido.';
        document.getElementById('noticia-data').textContent = '';
        document.getElementById('noticia-texto').innerHTML = '<p class="texto-conteudo">Tente voltar para a lista de notícias.</p>';
        return;
    }

    // 2. Carrega a notícia principal
    const noticia = await carregarNoticiaDetalhe(id);
    
    // 3. Se a notícia principal foi carregada, busca as sugeridas
    if (noticia) {
        carregarSugeridas(id);
    }
}