
  document.querySelectorAll('.grupo-membros').forEach(secao => {
    const botao = secao.querySelector('.toggle-btn');
    const conteudo = secao.querySelector('.grade-membros');

    // começa aberto
    secao.classList.add('aberto');

    botao.addEventListener('click', () => {
      secao.classList.toggle('aberto');
      conteudo.style.display = secao.classList.contains('aberto') ? 'grid' : 'none';
    });
  });
