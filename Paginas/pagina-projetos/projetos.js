document.addEventListener("DOMContentLoaded", function () {
    var botoes = document.querySelectorAll(".botao-filtro");
    var itens = document.querySelectorAll(".item-galeria");
    var mensagem = document.getElementById("mensagem");

    botoes.forEach(function (botao) {
        botao.addEventListener("click", function () {
            var filtro = botao.getAttribute("data-filtro");

            // Marca o botão ativo
            botoes.forEach(function (b) {
                b.classList.remove("ativo");
            });
            botao.classList.add("ativo");

            var itensVisiveis = false;

            // Filtra os itens
            itens.forEach(function (item) {
                if (filtro === "todos" || item.classList.contains(filtro)) {
                    item.style.display = "block";
                    setTimeout(() => item.style.opacity = "1", 50);
                    itensVisiveis = true;
                } else {
                    item.style.opacity = "0";
                    setTimeout(() => item.style.display = "none", 400);
                }
            });
            if (itensVisiveis) {
                mensagem.style.display ="none";
            } else {
                mensagem.style.display = "block"
            }
        });
    });
});

