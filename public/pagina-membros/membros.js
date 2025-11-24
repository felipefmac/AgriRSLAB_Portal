// membros.js

const API_PUBLIC_MEMBROS = '/api/membros/publicos';

// Dicionário de tradução para cargos
const dicionario = {
  'pt': {
    'coordenador': 'Pesquisador(a)/ Coordenador(a)',
    'pesquisador': 'Pesquisador(a) Associado(a)',
    'doutorando': 'Doutorando(a)',
    'mestrando': 'Mestrando(a)',
    'bolsista': 'Bolsista',
    'ver': 'Ver',
    'curriculo': 'CURRÍCULO',
    'lattes': 'LATTES'
  },
  'en': {
    'coordenador': 'Researcher/ Coordinator',
    'pesquisador': 'Associate Researcher',
    'doutorando': 'PhD Student',
    'mestrando': 'Master\'s Student',
    'bolsista': 'Fellow',
    'ver': 'View',
    'curriculo': 'CURRICULUM',
    'lattes': 'LATTES'
  }
};

// Mapeia id_categoria do banco -> slug da seção + chave de tradução
function getInfoGrupo(id_categoria, lang = 'pt') {
  const traducoes = dicionario[lang] || dicionario['pt'];

  switch (Number(id_categoria)) {
    case 1:
      return { slug: 'coordenadores', cargo: traducoes.coordenador };
    case 2:
      return { slug: 'pesquisadores', cargo: traducoes.pesquisador };
    case 3:
      return { slug: 'doutorandos', cargo: traducoes.doutorando };
    case 4:
      return { slug: 'mestrandos', cargo: traducoes.mestrando };
    case 5:
      return { slug: 'bolsistas', cargo: traducoes.bolsista };
    default:
      return null;
  }
}

document.addEventListener('DOMContentLoaded', inicializarMembros);
window.addEventListener('languageChange', inicializarMembros);

function inicializarMembros() {
  const secoes = {};

  // Mapeia cada <section class="grupo-membros" data-grupo="...">
  document.querySelectorAll('.grupo-membros').forEach(secao => {
    const slug = secao.dataset.grupo; // coordenadores, pesquisadores, etc.
    const grade = secao.querySelector('.grade-membros');
    secoes[slug] = {
      secao,
      grade,
      count: 0
    };
  });

  carregarMembrosPublicos(secoes);
}

async function carregarMembrosPublicos(secoes) {
  try {
    const lang = localStorage.getItem('selectedLanguage') || 'pt';
    const traducoes = dicionario[lang] || dicionario['pt'];

    const resp = await fetch(`${API_PUBLIC_MEMBROS}?lang=${lang}`);
    if (!resp.ok) {
      console.error('Erro ao buscar membros públicos:', resp.status);
      return;
    }

    const membros = await resp.json();

    // Limpa grades antes de recarregar
    Object.values(secoes).forEach(({ grade }) => {
      if (grade) grade.innerHTML = '';
    });

    // Cria os cards em cada grupo
    membros.forEach(membro => {
      const infoGrupo = getInfoGrupo(membro.id_categoria, lang);
      if (!infoGrupo) return;

      const entry = secoes[infoGrupo.slug];
      if (!entry || !entry.grade) return;

      const card = document.createElement('div');
      card.classList.add('card-membro');

      card.innerHTML = `
        <div class="card-frente">
          <img src="${membro.foto}" alt="Foto do Membro">
          <div class="nome-membro-banner">
            <h3>${membro.nome}</h3>
            <p>${infoGrupo.cargo}</p>
          </div>
        </div>
        <div class="card-verso">
          <p>${membro.descricao || ''}</p>
          ${membro.link
          ? `<a href="${membro.link}" target="_blank" class="lattes-link" title="Currículo / Perfil">
                   <span class="lattes-ver">${traducoes.ver}</span>
                   <span class="lattes-curriculo">${traducoes.curriculo}</span>
                   <span class="lattes-lattes">${traducoes.lattes}</span>
                 </a>`
          : ''
        }
        </div>
      `;

      entry.grade.appendChild(card);
      entry.count++;
    });

    // Depois de preencher, esconde grupos vazios e ativa o toggle nos que têm membros
    Object.values(secoes).forEach(({ secao, grade, count }) => {
      if (!count) {
        // não tem nenhum membro nesse grupo → esconde título + tudo
        secao.style.display = 'none';
        return;
      }

      // tem membros → deixa visível e aplica comportamento de acordeão
      const botao = secao.querySelector('.toggle-btn');

      // começa aberto
      secao.classList.add('aberto');
      if (grade) grade.style.display = 'grid';

      if (botao && grade) {
        // Remove listeners antigos para evitar duplicação (clonando o nó)
        const novoBotao = botao.cloneNode(true);
        botao.parentNode.replaceChild(novoBotao, botao);

        novoBotao.addEventListener('click', () => {
          secao.classList.toggle('aberto');
          grade.style.display = secao.classList.contains('aberto') ? 'grid' : 'none';
        });
      }
    });
  } catch (erro) {
    console.error('Erro ao carregar membros públicos:', erro);
  }
}
