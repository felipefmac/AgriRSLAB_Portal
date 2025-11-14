// Converte '2025-10-27T03:00:00.000Z' para '27/10/2025'
function formatarData(dataISO) {
  const data = new Date(dataISO);
  const dia = String(data.getUTCDate()).padStart(2, '0');
  const mes = String(data.getUTCMonth() + 1).padStart(2, '0'); // +1 porque meses começam em 0
  const ano = data.getUTCFullYear();
  return `${dia}/${mes}/${ano}`;
}

// Retorna o nome do mês em português (ex: "Janeiro")
function getNomeMes(dataISO) {
  const data = new Date(dataISO);
  // 'pt-BR' para português, 'long' para o nome completo
  return data.toLocaleString('pt-BR', { month: 'long', timeZone: 'UTC' });
}

// --- Lógica Principal ---

document.addEventListener("DOMContentLoaded", () => {
 
  // === ELEMENTOS ===
  const btnVerMais = document.querySelector(".btn-ver-mais");
  const cards = document.querySelectorAll(".cards-noticias a");
  const containerNoticias = document.querySelector(".cards-noticias");
  const filtroAno = document.getElementById("YearSelection");
  const filtroCategoria = document.getElementById("CategorySelection");
  const meses = document.querySelectorAll(".titulo-mes");

  // === ORGANIZAÇÃO DOS FILTROS ===
  const filtrosLinha = document.createElement("div");
  filtrosLinha.classList.add("filtros-linha");

  const filtrosContainer = filtroAno.closest(".filtros-superiores");
  filtrosContainer.prepend(filtrosLinha);

  // Move os filtros (Categoria e Ano) para a nova linha
  document.querySelectorAll(".filterCategorySelection, .filterYearSelection")
    .forEach(f => filtrosLinha.appendChild(f));

// === BOTÃO LIMPAR FILTRO ===
const btnLimpar = document.createElement("button");
btnLimpar.textContent = "Limpar filtro";
btnLimpar.classList.add("btn-limpar-filtro");
btnLimpar.style.display = "none";

const containerBtnLimpar = document.createElement("div");
containerBtnLimpar.classList.add("container-btn-limpar");

// Aqui muda: adiciona o botão DEPOIS da linha dos filtros
filtrosLinha.after(containerBtnLimpar);
containerBtnLimpar.appendChild(btnLimpar);


  // === CONFIGURAÇÕES ===
  const qtdInicio = 4;
  const passo = 4;
  let index = qtdInicio;

  // === MENSAGEM DE NENHUM REGISTRO ===
  const msgNenhum = document.createElement("p");
  msgNenhum.textContent = "Nenhum registro encontrado.";
  msgNenhum.classList.add("mensagem-nenhum");
  msgNenhum.style.display = "none";
  containerNoticias.parentElement.insertBefore(msgNenhum, containerNoticias.nextSibling);

  // === ESTADO INICIAL ===
  function aplicarEstadoInicial() {
    cards.forEach((card, i) => {
      if (i < qtdInicio) {
        card.style.display = "block";
        card.classList.remove("hidden");
      } else {
        card.style.display = "none";
        card.classList.add("hidden");
      }
    });

    // Esconde os títulos dos meses no início
    meses.forEach(m => (m.style.display = "none"));

    btnVerMais.style.display = cards.length > qtdInicio ? "block" : "none";
    msgNenhum.style.display = "none";
    btnLimpar.style.display = "none";

    filtroAno.value = "todos";
    if (filtroCategoria) filtroCategoria.value = "todas";

    index = qtdInicio;
  }

  aplicarEstadoInicial();

  // === BOTÃO VER MAIS ===
  if (btnVerMais) {
    btnVerMais.addEventListener("click", () => {
      let mostradas = 0;
      for (let i = 0; i < cards.length && mostradas < passo; i++) {
        if (cards[i].style.display === "none") {
          cards[i].style.display = "block";
          cards[i].classList.remove("hidden");
          mostradas++;
          index++;
        }
      }

      // Mostra os meses quando clica em “Ver mais”
      meses.forEach(m => (m.style.display = "block"));

      if (index >= cards.length) btnVerMais.style.display = "none";
    });
  }

  // === FUNÇÃO DE FILTRO (ANO + CATEGORIA) ===
  function aplicarFiltros() {
    const anoSelecionado = filtroAno.value;
    const categoriaSelecionada = filtroCategoria ? filtroCategoria.value : "todas";
    let encontrou = false;
    let contadorVisiveis = 0;

    cards.forEach(card => {
      const timeElement = card.querySelector("time");
      const tag = card.querySelector(".tagEvent");
      if (!timeElement || !tag) return;

      const anoNoticia = timeElement.getAttribute("datetime").slice(0, 4);
      const categoriaNoticia = tag.dataset.category;

      const anoOK = (anoSelecionado === "todos" || anoSelecionado === anoNoticia);
      const categoriaOK = (categoriaSelecionada === "todas" || categoriaSelecionada === categoriaNoticia);

      if (anoOK && categoriaOK) {
        card.style.display = "block";
        card.classList.remove("hidden");
        encontrou = true;
      } else {
        card.style.display = "none";
      }
    });

    // Mostra apenas os meses que têm notícias visíveis
    meses.forEach(mes => {
      let temVisivel = false;
      let next = mes.nextElementSibling;
      while (next && !next.classList.contains("titulo-mes")) {
        if (next.tagName === "A" && next.style.display !== "none") {
          temVisivel = true;
          break;
        }
        next = next.nextElementSibling;
      }
      mes.style.display = temVisivel ? "block" : "none";
    });

    // Exibe só 4 após filtrar
    cards.forEach(card => {
      if (card.style.display !== "none") {
        contadorVisiveis++;
        if (contadorVisiveis > qtdInicio) card.classList.add("hidden");
      }
    });

    const temMais = contadorVisiveis > qtdInicio;
    btnVerMais.style.display = temMais ? "block" : "none";
    msgNenhum.style.display = encontrou ? "none" : "block";

    // Aparece o botão limpar se QUALQUER filtro for usado
const filtroAtivo = (anoSelecionado !== "todos" || categoriaSelecionada !== "todas");
    btnLimpar.style.display = filtroAtivo ? "inline-block" : "none";
  }

  // === APLICA OS FILTROS ===
  if (filtroAno) filtroAno.addEventListener("change", aplicarFiltros);
  if (filtroCategoria) filtroCategoria.addEventListener("change", aplicarFiltros);

  // === LIMPAR FILTRO ===
  btnLimpar.addEventListener("click", () => {
    filtroAno.value = "todos";
    if (filtroCategoria) filtroCategoria.value = "todas";
    aplicarEstadoInicial();
  });


    // Carrossel horizontal (defesas)
const setaEsquerda = document.querySelector('.seta-esquerda');
const setaDireita = document.querySelector('.seta-direita');
const cardsDefesas = document.querySelector('.cards-defesas');

if (setaEsquerda && setaDireita && cardsDefesas) {
    setaDireita.addEventListener('click', () => {
      cardsDefesas.scrollBy({ left: 200, behavior: 'smooth' });
    });
    setaEsquerda.addEventListener('click', () => {
      cardsDefesas.scrollBy({ left: -200, behavior: 'smooth' });
    });
  }

// Carrossel vertical (linha do tempo)
const setaCima = document.querySelector('.seta-cima');
const setaBaixo = document.querySelector('.seta-baixo');
const conteudoLinha = document.querySelector('.conteudo-linha');

if (setaCima && setaBaixo && conteudoLinha) {
    setaBaixo.addEventListener('click', () => {
      conteudoLinha.scrollBy({ top: 100, behavior: 'smooth' });
    });
    setaCima.addEventListener('click', () => {
      conteudoLinha.scrollBy({ top: -100, behavior: 'smooth' });
    });
  }
  // --- MÓDULO 3: Compartilhamento de Notícias ---
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);
  const shareWhatsApp = document.getElementById("shareWhatsApp");
  const shareEmail = document.getElementById("shareEmail");
  const shareLinkedIn = document.getElementById("shareLinkedIn");
  // As verificações de segurança já existiam aqui (o que é ótimo)
  if (shareWhatsApp) {
    shareWhatsApp.href = `https://api.whatsapp.com/send?text=${title}%20${url}`;
  }
  if (shareEmail) {
    shareEmail.href = `mailto:?subject=${title}&body=Veja%20essa%20matéria:%20${url}`;
  }
  if (shareLinkedIn) {
    shareLinkedIn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
  }
  
  // Chama a função para carregar as notícias PAG NOTICIAS1
  carregarNoticias();
  // Chama a função para carregar as notícias principais PAG NOTICIAS
  carregarNoticiasPrincipais();
});

// Função principal para buscar e exibir as notícias
async function carregarNoticias() {
  const container = document.getElementById('container-noticias-dinamicas');
  if (!container) return; // Para o script se o container não existir

  try {
    // 1. FAZ A CHAMADA (FETCH) PARA A SUA API
    const response = await fetch('/api/noticias'); // (Lembre-se que o back-end deve ordenar por data)

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const noticias = await response.json();

    if (noticias.length === 0) {
      container.innerHTML = '<p style="text-align: center; margin: 20px;">Nenhuma notícia encontrada.</p>';
      return;
    }

    // 2. Lógica para agrupar por MÊS (como no seu exemplo)
    let mesAtual = '';
    let anoAtual = '';

    // Limpa o container
    container.innerHTML = '';

    noticias.forEach(noticia => {
      const dataNoticia = new Date(noticia.data_criacao);
      const nomeMes = getNomeMes(noticia.data_criacao);
      const anoNoticia = dataNoticia.getUTCFullYear();

      // 3. Verifica se o mês ou ano mudou
      if (nomeMes !== mesAtual || anoNoticia !== anoAtual) {
        // Atualiza os marcadores
        mesAtual = nomeMes;
        anoAtual = anoNoticia;

        // Adiciona o Título do Mês (como no seu molde)
        // (capitalize() é para "janeiro" virar "Janeiro")
        const nomeMesCapitalizado = nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1);
        container.innerHTML += `<h2 id="Mes" class="titulo-mes">${nomeMesCapitalizado}</h2>`;
      }

      // 4. CRIA O HTML DO ARTIGO (usando seu molde exato)
      const noticiaHtml = `
        <a href="${noticia.url_noticia}">
          <div class="card-noticia">
              <img class="imageNotice" src="${noticia.url_imagem}" alt="imagem noticia">
              <div class="texto">
                  <span class="tagEvent">${noticia.categoria}</span>
                  <h3>${noticia.titulo}</h3>
                  <p>${noticia.texto}</p>
                  <span class="dateEvent"><time datetime="${noticia.data_criacao}">${formatarData(noticia.data)}</time></span>
                  <p class="continuar-lendo">Ler mais</p>
              </div>
          </div>
         </a>  
      `;

      // 5. Adiciona o HTML do artigo logo após o título do mês
      container.innerHTML += noticiaHtml;
    });

  } catch (error) {
    console.error('Falha ao carregar notícias:', error);
    container.innerHTML = '<p style="text-align: center; color: red;">Erro ao carregar notícias.</p>';
  }
}

async function carregarNoticiasPrincipais() {
  const container = document.getElementById('cards-noticias');
  if (!container) return;

  try {
    const response = await fetch('/api/noticias/destaques', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const noticiasDestaque = await response.json();

    const verTodasBtn = container.querySelector('.ver-todas');
    container.innerHTML = ''; // Limpa o container

    // Pegar apenas as 3 primeiras notícias
    const noticiasParaExibir = noticiasDestaque.slice(0, 3);

    if (noticiasDestaque.length === 0) {
      container.innerHTML = '<p style="text-align: center; margin: 20px;">Nenhuma notícia encontrada.</p>';
      
      if (verTodasBtn) {
      container.appendChild(verTodasBtn);

      return;
    }
    }

    noticiasParaExibir.forEach(noticia => {
      const dataFormatada = new Date(noticia.data_criacao).toLocaleDateString('pt-BR', {
        day: '2-digit', month: 'short', year: 'numeric'}).toUpperCase().replace('.', '');

      const cardHtml = `
          <a href="${noticia.url_noticia || '#'}">
              <div class="card-noticia">
                  <img src="${noticia.url_imagem}" alt="${noticia.titulo}">
                  <div class="texto">
                      <h3>${noticia.titulo}</h3>
                      <p>${noticia.subtitulo || ''}</p>
                      <span>${dataFormatada}</span>
                      <p class="continuar-lendo">Ler mais</p>
                  </div>
              </div>
          </a>
      `;

      container.innerHTML += cardHtml;
    });

    if (verTodasBtn) {
      container.appendChild(verTodasBtn);
    }

  } catch (error) {
    console.error('Falha ao carregar notícias:', error);
    container.innerHTML = '<p style="text-align: center; color: red;">Erro ao carregar notícias.</p>';
  }
}