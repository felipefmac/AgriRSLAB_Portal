// Scroll existente (mantém)
function scrollToSection() {
    document.getElementById("verMestrado").scrollIntoView({ behavior: "smooth" });
}

// Dicionário de tradução
const dicionario = {
    'pt': {
        'requisitos': 'Requisitos:',
        'beneficios': 'Benefícios:',
        'candidatar': 'Candidatar-se',
        'nenhumaVaga': 'Nenhuma vaga disponível no momento.',
        'erroCarregar': 'Erro ao carregar vagas.'
    },
    'en': {
        'requisitos': 'Requirements:',
        'beneficios': 'Benefits:',
        'candidatar': 'Apply',
        'nenhumaVaga': 'No vacancies available at the moment.',
        'erroCarregar': 'Error loading vacancies.'
    }
};

// Novo código que carrega vagas (necessário!)
document.addEventListener("DOMContentLoaded", carregarVagas);

// Recarrega vagas quando o idioma mudar
window.addEventListener('languageChange', carregarVagas);

async function carregarVagas() {
    const container = document.getElementById("lista-vagas");

    if (!container) {
        console.error("Elemento #lista-vagas não encontrado.");
        return;
    }

    try {
        // Pega o idioma do localStorage
        const lang = localStorage.getItem('selectedLanguage') || 'pt';
        const traducoes = dicionario[lang] || dicionario['pt'];

        const resposta = await fetch(`/api/vagas/publicos?lang=${lang}`);
        const vagas = await resposta.json();

        if (!vagas.length) {
            container.innerHTML = `<p>${traducoes.nenhumaVaga}</p>`;
            return;
        }

        container.innerHTML = "";

        vagas.forEach(vaga => {
            const card = document.createElement("div");
            card.classList.add("card-vagas");

            card.innerHTML = `
        <h4>${vaga.titulo}</h4>
        <p>${vaga.descricao.substring(0, 180)}...</p>

        <h5>${traducoes.requisitos}</h5>
        <ul>
          ${vaga.requisitos.map(r => `<li>${r}</li>`).join("")}
        </ul>

        <h5>${traducoes.beneficios}</h5>
        <ul>
          ${vaga.beneficios.map(b => `<li>${b}</li>`).join("")}
        </ul>

        <a href="../pagina-vagas/vagas-candidatura.html?id=${vaga.vaga_id}"
           class="btn-vagas btn-primary-vagas btn-sm-vagas">
           ${traducoes.candidatar}
        </a>
      `;

            container.appendChild(card);
        });

    } catch (erro) {
        console.error("Erro ao carregar vagas:", erro);
        const lang = localStorage.getItem('selectedLanguage') || 'pt';
        const traducoes = dicionario[lang] || dicionario['pt'];
        container.innerHTML = `<p>${traducoes.erroCarregar}</p>`;
    }
}
