// artigos.js
document.addEventListener('DOMContentLoaded', () => {
    // ===================== 1. ABRIR / FECHAR DROPDOWNS =====================
    const toggleButtons = document.querySelectorAll('.filter-toggle');
    toggleButtons.forEach(button => {
      button.addEventListener('click', function (e) {
        e.stopPropagation(); // Previne fechamento imediato ao clicar
        const dropdown = this.closest('.filter-dropdown');
        const isOpen = dropdown.classList.contains('open');
  
        // Fecha outros abertos
        document.querySelectorAll('.filter-dropdown.open').forEach(d => {
            if(d !== dropdown) {
                d.classList.remove('open');
                d.querySelector('.filter-toggle').setAttribute('aria-expanded', 'false');
            }
        });
  
        if (!isOpen) {
          dropdown.classList.add('open');
          this.setAttribute('aria-expanded', 'true');
        } else {
          dropdown.classList.remove('open');
          this.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Fecha dropdown ao clicar fora
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.filter-dropdown')) {
            document.querySelectorAll('.filter-dropdown.open').forEach(d => {
                d.classList.remove('open');
                d.querySelector('.filter-toggle').setAttribute('aria-expanded', 'false');
            });
        }
    });
  
    // ===================== 2. FILTRAR PUBLICAÇÕES =====================
    const applyButtons = document.querySelectorAll('.btn-apply-filter');
  
    function applyFilters() {
      const allCards = document.querySelectorAll('.publicacao');
      const sectionTitles = document.querySelectorAll('.titulo-secao'); 
  
      const tipoDropdown = document.querySelector('[data-filter-name="tipo"]');
      const checkedTipos = tipoDropdown
        ? Array.from(tipoDropdown.querySelectorAll('input[type="checkbox"]:checked')).map(c => c.value)
        : [];
  
      // Se não houver checkboxes marcados, consideramos que deve mostrar todos
      const mostrarTodosTipos = checkedTipos.length === 0;
  
      // Mostra ou esconde cards conforme filtros
      allCards.forEach(card => {
        // Verifica se o card tem alguma das classes marcadas (ex: 'ac', 'livros')
        const matchTipo = mostrarTodosTipos || checkedTipos.some(tipo => card.classList.contains(tipo));
        
        // Aplica display
        card.style.display = matchTipo ? 'flex' : 'none';
      });
  
      // Gerencia visibilidade dos títulos de seção
      const sections = document.querySelectorAll('.publications-section');
      
      sections.forEach(section => {
        const titulo = section.querySelector('.titulo-secao');
        const visibleCards = section.querySelectorAll('.publicacao:not([style*="display: none"])');
        
        if(titulo) {
            // Só mostra o título se houver cards visíveis E se o título não estava oculto originalmente por falta de dados
            if (visibleCards.length > 0) {
                titulo.style.display = ''; 
            } else {
                titulo.style.display = 'none';
            }
        }
      });
    }
  
    // Botões “Aplicar”
    applyButtons.forEach(button => {
      button.addEventListener('click', () => {
        applyFilters();
        const dropdown = button.closest('.filter-dropdown');
        if (dropdown) {
          dropdown.classList.remove('open');
          const toggle = dropdown.querySelector('.filter-toggle');
          if (toggle) toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
});
