  const hamburguer = document.getElementById('hamburguer');
  const menu = document.querySelector('.ulNav');

  hamburguer.addEventListener('click', () => {
    menu.classList.toggle('active');
  });