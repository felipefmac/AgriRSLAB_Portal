document.addEventListener('DOMContentLoaded', function () {
    // Função para carregar conteúdo de um arquivo em um elemento
    const loadContent = async (url, elementSelector) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erro ao carregar ${url}: ${response.statusText}`);
            }
            const text = await response.text();
            const element = document.querySelector(elementSelector);
            if (element) {
                element.innerHTML = text;
            }
            return text;
        } catch (error) {
            console.error(error);
        }
    };

    // Carrega o header e depois executa os scripts necessários
    loadContent('../HeaderFooter/header.html', 'header').then(() => {
        // Define o idioma padrão ou recupera do localStorage
        if (!localStorage.getItem('site_lang')) {
            localStorage.setItem('site_lang', 'pt-br');
        }

        // Torna a função de mudança de idioma global
        window.mudarIdioma = function(lang) {
            localStorage.setItem('site_lang', lang);
            window.location.reload(); // Recarrega a página para aplicar a tradução
        }

        // Adiciona os eventos de clique aos botões de idioma
        const btnPt = document.querySelector('button[onclick*="pt-br"]');
        const btnEn = document.querySelector('button[onclick*="en-us"]');
        if(btnPt) btnPt.setAttribute('onclick', "mudarIdioma('pt-br')");
        if(btnEn) btnEn.setAttribute('onclick', "mudarIdioma('en-us')");

        // Após o header ser carregado, a função de tradução (que está no header.html) já existe.
        // Podemos chamá-la.
        if (typeof traduzirPagina === 'function') {
            traduzirPagina();
        }

        // Ativa o menu hambúrguer
        const hamburguer = document.getElementById('hamburguer');
        const nav = document.getElementById('navHeader');
        if (hamburguer && nav) {
            hamburguer.addEventListener('click', () => {
                nav.classList.toggle('active');
            });
        }
    });

    // Carrega o footer
    loadContent('../HeaderFooter/footer.html', 'footer');
});

document.addEventListener("DOMContentLoaded", () => {
  // === CARREGAR HEADER ===
  fetch("../HeaderFooter/header.html")
    .then(response => {
      if (!response.ok) throw new Error("Erro ao carregar o header");
      return response.text();
    })
    .then(data => {
      document.querySelector("header").innerHTML = data;

      // Só executa o controle do menu depois do header existir
      inicializarMenuHamburguer();
    })
    .catch(error => console.error("Erro ao carregar header:", error));

  // === CARREGAR FOOTER ===
 fetch("../HeaderFooter/footer.html")
    .then(response => {
      if (!response.ok) throw new Error("Erro ao carregar o footer");
      return response.text();
    })
    .then(data => {
      document.querySelector("footer").innerHTML = data;

      // === INSERIR ANO AUTOMÁTICO ===
      const anoElemento = document.getElementById("ano");
      if (anoElemento) {
        anoElemento.textContent = new Date().getFullYear();
      }
    })
    .catch(error => console.error("Erro ao carregar footer:", error));
});

// === FUNÇÃO PARA CONTROLAR O MENU ===
function inicializarMenuHamburguer() {
  const hamburguer = document.getElementById("hamburguer");
  const menu = document.querySelector(".ulNav");

  if (!hamburguer || !menu) {
    console.warn("Elementos do menu não encontrados no header.");
    return;
  }

  hamburguer.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("active");
  });

  // Fecha o menu ao clicar fora dele
  document.addEventListener("click", (event) => {
    const cliqueDentroMenu = menu.contains(event.target);
    const cliqueNoHamburguer = hamburguer.contains(event.target);
    if (!cliqueDentroMenu && !cliqueNoHamburguer) {
      menu.classList.remove("active");
    }
  });
}
