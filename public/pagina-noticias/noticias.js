// =========================================
// CONFIGURAÇÕES GLOBAIS
// =========================================
const ITENS_POR_PAGINA = 10;
let todasAsNoticias = [];
let noticiasFiltradas = [];
let itensVisiveis = 0;
let ultimoMesRenderizado = '';

// =========================================
// TRADUÇÃO DINÂMICA
// =========================================
const dicionario = {
    'pt': {
        'principaisNoticias': 'Principais Notícias',
        'eventos': 'Eventos',
        'proximasDefesas': 'Próximas Defesas',
        'verTodas': 'Ver todas as notícias',
        'carregandoDestaques': 'Carregando destaques...',
        'erroDestaques': 'Não foi possível carregar os destaques.',
        'carregandoDefesas': 'Carregando defesas...',
        'erroDefesas': 'Erro ao carregar defesas.',
        'nenhumaDefesa': 'Nenhuma defesa agendada no momento.',
        'carregandoEventos': 'Carregando notícias...',
        'erroEventos': 'Erro ao carregar notícias.',
        'nenhumEvento': 'Nenhuma notícia encontrada.',
        'lerMais': 'Ler mais',
        'verMaisNoticias': 'Ver mais notícias',
        'nenhumaNoticia': 'Nenhuma notícia encontrada.',
        'carregandoNoticias': 'Carregando notícias...',
        'erroNoticias': 'Erro ao carregar notícias.'
    },
    'en': {
        'principaisNoticias': 'Main News',
        'eventos': 'Events',
        'proximasDefesas': 'Upcoming Defenses',
        'verTodas': 'See all news',
        'carregandoDestaques': 'Loading highlights...',
        'erroDestaques': 'Could not load highlights.',
        'carregandoDefesas': 'Loading defenses...',
        'erroDefesas': 'Error loading defenses.',
        'nenhumaDefesa': 'No defenses scheduled at the moment.',
        'carregandoEventos': 'Loading news...',
        'erroEventos': 'Error loading news.',
        'nenhumEvento': 'No news found.',
        'lerMais': 'Read more',
        'verMaisNoticias': 'See more news',
        'nenhumaNoticia': 'No news found.',
        'carregandoNoticias': 'Loading news...',
        'erroNoticias': 'Error loading news.'
    }
};

// =========================================
// FUNÇÕES AUXILIARES
// =========================================
function formatarData(dataISO, lang = 'pt') {
    if (!dataISO) return '';
    const locale = lang === 'pt' ? 'pt-BR' : 'en-US';
    const data = new Date(dataISO);
    const dia = String(data.getUTCDate()).padStart(2, '0');
    const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
    const ano = data.getUTCFullYear();
    return locale === 'pt-BR' ? `${dia}/${mes}/${ano}` : `${mes}/${dia}/${ano}`;
}

function getNomeMes(dataISO, lang = 'pt') {
    if (!dataISO) return '';
    const locale = lang === 'pt' ? 'pt-BR' : 'en-US';
    const data = new Date(dataISO);
    return data.toLocaleString(locale, { month: 'long', timeZone: 'UTC' });
}

// =========================================
// INICIALIZAÇÃO
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    const containerCompleto = document.getElementById('container-noticias-dinamicas');
    const containerDestaques = document.getElementById('cards-noticias');

    // PÁGINA "TODAS AS NOTÍCIAS" (notícias1)
    if (containerCompleto) {
        const filtroAno = document.getElementById("YearSelection");
        const filtroCategoria = document.getElementById("CategorySelection");
        const btnVerMais = document.querySelector(".btn-ver-mais");

        if (filtroAno) filtroAno.addEventListener("change", () => aplicarFiltros(true));
        if (filtroCategoria) filtroCategoria.addEventListener("change", () => aplicarFiltros(true));
        if (btnVerMais) btnVerMais.addEventListener("click", carregarMaisNoticias);

        traduzirPaginaCompleta();
        window.addEventListener('languageChange', traduzirPaginaCompleta);
    }
    // PÁGINA HOME
    else if (containerDestaques) {
        traduzirPagina();
        window.addEventListener('languageChange', traduzirPagina);
    }

    configurarCarrosseis();
    configurarCompartilhamento();
});

function traduzirPagina() {
    const lang = localStorage.getItem('selectedLanguage') || 'pt';
    const traducoes = dicionario[lang] || dicionario['pt'];

    // Traduz títulos estáticos
    const titulosSecao = document.querySelectorAll('.titulo-secao');
    if (titulosSecao.length > 0) {
        if (titulosSecao[0]) titulosSecao[0].textContent = traducoes.principaisNoticias;
        if (titulosSecao[1]) titulosSecao[1].textContent = traducoes.eventos;
        if (titulosSecao[2]) titulosSecao[2].textContent = traducoes.proximasDefesas;
    }

    // Recarrega conteúdo dinâmico com o idioma correto
    carregarDestaques(lang, traducoes);
    carregarDefesas(lang, traducoes);
    carregarEventosDoMes(lang, traducoes);
}

function traduzirPaginaCompleta() {
    const lang = localStorage.getItem('selectedLanguage') || 'pt';
    const traducoes = dicionario[lang] || dicionario['pt'];

    const btnVerMais = document.querySelector(".btn-ver-mais");
    if (btnVerMais) {
        btnVerMais.textContent = traducoes.verMaisNoticias;
    }
    carregarTodasNoticias(lang, traducoes);
}

// =========================================
// LÓGICA PRINCIPAL (notícias1)
// =========================================
async function carregarTodasNoticias(lang = 'pt', traducoes = dicionario.pt) {
    const container = document.getElementById('container-noticias-dinamicas');
    container.innerHTML = `<p class="loading">${traducoes.carregandoNoticias}</p>`;

    try {
        const response = await fetch(`/api/noticias?lang=${lang}`);
        if (!response.ok) throw new Error('Erro na API');

        todasAsNoticias = await response.json();
        aplicarFiltros(true);

    } catch (error) {
        console.error(error);
        container.innerHTML = `<p class="erro">${traducoes.erroNoticias}</p>`;
    }
}

function aplicarFiltros(resetar = false) {
    const filtroAnoEl = document.getElementById("YearSelection");
    const filtroCatEl = document.getElementById("CategorySelection");
    const lang = localStorage.getItem('selectedLanguage') || 'pt';

    const filtroAno = filtroAnoEl ? filtroAnoEl.value : "todos";
    const filtroCategoria = filtroCatEl ? filtroCatEl.value : "todas";

    noticiasFiltradas = todasAsNoticias.filter(noticia => {
        if (!noticia.data_criacao) return false;

        const dataObj = new Date(noticia.data_criacao);
        const anoNoticia = dataObj.getUTCFullYear().toString();

        const catNoticia = noticia.categoria ? noticia.categoria.toLowerCase().trim() : '';
        const filtroCatValor = filtroCategoria.toLowerCase().trim();

        const anoValido = ["todos", "todas", "ano"].includes(filtroAno.toLowerCase());
        const matchAno = anoValido || (anoNoticia === filtroAno);

        const catValida = ["todos", "todas", "categoria"].includes(filtroCatValor);
        const matchCat = catValida || (catNoticia === filtroCatValor);

        return matchAno && matchCat;
    });

    noticiasFiltradas.sort((a, b) => new Date(b.data_criacao) - new Date(a.data_criacao));

    if (resetar) {
        itensVisiveis = 0;
        document.getElementById('container-noticias-dinamicas').innerHTML = '';
        ultimoMesRenderizado = '';
    }

    carregarMaisNoticias();
}

// =========================================
// LÓGICA: PÁGINA HOME
// =========================================
async function carregarDestaques(lang = 'pt', traducoes = dicionario.pt) {
    const container = document.getElementById('cards-noticias');
    const btnVerTodasOriginal = container.querySelector('.ver-todas');
    container.innerHTML = `<p>${traducoes.carregandoDestaques}</p>`;

    try {
        const response = await fetch(`/api/noticias/destaques?lang=${lang}`);
        if (!response.ok) throw new Error('Erro API Destaques');

        const destaques = await response.json();
        container.innerHTML = '';

        destaques.slice(0, 3).forEach(noticia => {
            const dataFormatada = new Date(noticia.data_criacao).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', {
                day: '2-digit', month: 'short', year: 'numeric'
            }).toUpperCase().replace('.', '').replace(/ DE /g, ' ');

            const linkHref = noticia.url_noticia 
                ? noticia.url_noticia 
                : `noticias2.html?id=${noticia.id_noticias}`;
            
            const targetAttr = noticia.url_noticia ? '_blank' : '_self';

            const html = `
                <a href="${linkHref}" class="card-destaque-link" target="${targetAttr}" class="card-destaque-link">
                    <div class="card-noticia">
                        <img src="${noticia.url_imagem}" alt="${noticia.titulo}" onerror="this.style.display='none'">
                        <div class="texto">
                            <h3>${noticia.titulo}</h3>
                            <p>${noticia.subtitulo || ''}</p>
                            <span>${dataFormatada}</span>
                            <p class="continuar-lendo">${traducoes.lerMais}</p>
                        </div>
                    </div>
                </a>
            `;
            container.insertAdjacentHTML('beforeend', html);
        });

        if (btnVerTodasOriginal) {
            btnVerTodasOriginal.querySelector('a').textContent = traducoes.verTodas;
            container.appendChild(btnVerTodasOriginal);
        }

    } catch (error) {
        console.error(error);
        container.innerHTML = `<p>${traducoes.erroDestaques}</p>`;
    }
}

async function carregarDefesas(lang = 'pt', traducoes = dicionario.pt) {
    const container = document.querySelector('.cards-defesas');
    if (!container) return;

    container.innerHTML = `<p style="padding: 20px; color: #555; width: 100%; text-align: center;">${traducoes.carregandoDefesas}</p>`;

    try {
        const response = await fetch(`/api/noticias/defesas?lang=${lang}`);
        if (!response.ok) throw new Error('Erro API Defesas');

        let todasAsNoticias = await response.json();

        // FILTRO: Apenas categoria "Defesa"
        const defesas = todasAsNoticias.filter(noticia =>
            noticia.categoria && noticia.categoria.toLowerCase().trim() === 'defesa'
        );

        container.innerHTML = '';

        if (defesas.length === 0) {
            container.innerHTML = `<p style="padding: 20px; color: #555; width: 100%; text-align: center;">${traducoes.nenhumaDefesa}</p>`;
            return;
        }

        const defesasParaExibir = defesas.slice(0, 6);

        defesasParaExibir.forEach(defesa => {
            const htmlCard = `
                <div class="card-defesa">
                    <img src="${defesa.url_imagem}" alt="${defesa.titulo}" onerror="this.src='../../imagens/1.1Imagens Git/logo_404notfound.png'">
                    <h3>${defesa.titulo || ''}</h3>
                    <p>${defesa.subtitulo || ''}</p>
                    <span>${formatarData(defesa.data_criacao, lang)}</span>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', htmlCard);
        });

    } catch (error) {
        console.error(error);
        container.innerHTML = `<p style="padding: 20px; color: red; width: 100%; text-align: center;">${traducoes.erroDefesas}</p>`;
    }
}

async function carregarEventosDoMes(lang = 'pt', traducoes = dicionario.pt) {
    const container = document.querySelector('.conteudo-linha');
    if (!container) return;

    container.innerHTML = `<p style="padding: 20px; color: #555; width: 100%; text-align: center;">${traducoes.carregandoEventos}</p>`;

    try {
        // Busca TODAS as notícias
        const response = await fetch(`/api/noticias?lang=${lang}`);
        if (!response.ok) throw new Error('Erro API Notícias');

        let todasAsNoticias = await response.json();
        todasAsNoticias.sort((a, b) => new Date(b.data_criacao) - new Date(a.data_criacao));

        container.innerHTML = '';

        if (todasAsNoticias.length === 0) {
            container.innerHTML = `<p style="padding: 20px; color: #555; width: 100%; text-align: center;">${traducoes.nenhumEvento}</p>`;
            return;
        }

        todasAsNoticias.forEach(noticia => {
            const htmlEvento = `
                <div class="evento">
                    <div class="data">
                        <span class="dia">${formatarDataEventoDIA(noticia.data_criacao, lang)}</span>
                        <span class="mes">${formatarDataEventoMES(noticia.data_criacao, lang)}</span>
                    </div>
                    <div class="info">
                        <h3>${noticia.titulo}</h3>
                        <p>${noticia.subtitulo || ''}</p>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', htmlEvento);
        });

    } catch (error) {
        console.error(error);
        container.innerHTML = `<p style="padding: 20px; color: red; width: 100%; text-align: center;">${traducoes.erroEventos}</p>`;
    }
}

// =========================================
// FUNÇÕES Página notícias 1
// =========================================
function carregarMaisNoticias() {
    const container = document.getElementById('container-noticias-dinamicas');
    const btnContainer = document.querySelector(".ver-todas");
    const lang = localStorage.getItem('selectedLanguage') || 'pt';
    const traducoes = dicionario[lang] || dicionario['pt'];

    if (noticiasFiltradas.length === 0) {
        container.innerHTML = `<p class="aviso">${traducoes.nenhumaNoticia}</p>`;
        if (btnContainer) btnContainer.style.display = 'none';
        return;
    }

    const proximoLote = noticiasFiltradas.slice(itensVisiveis, itensVisiveis + ITENS_POR_PAGINA);

    proximoLote.forEach(noticia => {
        const dataNoticia = noticia.data_criacao;
        const nomeMes = getNomeMes(dataNoticia, lang);
        const chaveMes = nomeMes;

        if (chaveMes !== ultimoMesRenderizado) {
            const nomeMesCap = nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1);
            container.insertAdjacentHTML('beforeend',
                `<h2 class="titulo-mes">${nomeMesCap}</h2>`
            );
            ultimoMesRenderizado = chaveMes;
        }

        const linkHref = noticia.url_noticia 
            ? noticia.url_noticia 
            : `noticias2.html?id=${noticia.id_noticias}`;
        
        const targetAttr = noticia.url_noticia ? 'target="_blank"' : '';

        // HTML do Card
        const html = `
            <a href="${linkHref}" class="link-card" ${targetAttr} class="link-card">
                <div class="card-noticia">
                    <img class="imageNotice" src="${noticia.url_imagem}" onerror="this.style.display='none'" alt="${noticia.titulo}">
                    <div class="texto">
                        <span class="tagEvent">${noticia.categoria || 'Geral'}</span>
                        <h3>${noticia.titulo}</h3>
                        <p>${noticia.texto ? noticia.texto.substring(0, 120) + '...' : ''}</p>
                        <span class="dateEvent">
                            <time datetime="${dataNoticia}">${formatarData(dataNoticia, lang)}</time>
                        </span>
                        <p class="continuar-lendo">${traducoes.lerMais}</p>
                    </div>
                </div>
            </a>
        `;
        container.insertAdjacentHTML('beforeend', html);
    });

    itensVisiveis += proximoLote.length;

    if (itensVisiveis >= noticiasFiltradas.length) {
        if (btnContainer) btnContainer.style.display = 'none';
    } else {
        if (btnContainer) btnContainer.style.display = 'block';
    }
}

// =========================================
// FUNÇÕES GERAIS
// =========================================
function configurarCarrosseis() {
    const cardsDefesas = document.querySelector('.cards-defesas');
    if (cardsDefesas) {
        document.querySelector('.seta-direita')?.addEventListener('click', () => {
            cardsDefesas.scrollBy({ left: 200, behavior: 'smooth' });
        });
        document.querySelector('.seta-esquerda')?.addEventListener('click', () => {
            cardsDefesas.scrollBy({ left: -200, behavior: 'smooth' });
        });
    }

    const conteudoLinha = document.querySelector('.conteudo-linha');
    if (conteudoLinha) {
        document.querySelector('.seta-baixo')?.addEventListener('click', () => {
            conteudoLinha.scrollBy({ top: 100, behavior: 'smooth' });
        });
        document.querySelector('.seta-cima')?.addEventListener('click', () => {
            conteudoLinha.scrollBy({ top: -100, behavior: 'smooth' });
        });
    }
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

function formatarDataEventoDIA(dataISO, lang = 'pt') {
    if (!dataISO) return '';
    const data = new Date(dataISO);
    const dia = String(data.getUTCDate()).padStart(2, '0');
    return `${dia}`;
}

function formatarDataEventoMES(dataISO, lang = 'pt') {
    if (!dataISO) return '';
    const locale = lang === 'pt' ? 'pt-BR' : 'en-US';
    const data = new Date(dataISO);
    const mes = data.toLocaleString(locale, { month: 'short', timeZone: 'UTC' }).toUpperCase().replace('.', '');
    return `${mes}`;
}
