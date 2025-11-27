document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".envio-de-email-contato");
  const btnSubmit = document.getElementById("btn-contato-submit");
  const msgContainer = document.getElementById("contato-message");

  if (!form || !btnSubmit || !msgContainer) {
    return;
  }

  function showMessage(message, type) {
    msgContainer.textContent = message;
    msgContainer.className = `form-message ${type}`;
    msgContainer.style.display = 'block';
    // Oculta a mensagem após 5 segundos
    setTimeout(() => { msgContainer.style.display = 'none'; }, 5000);
  }

  const customAlert = (message, isError = false) => {
    showMessage(message, isError ? 'error' : 'success');
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = form.querySelector("#nome")?.value?.trim() || "";
    const email = form.querySelector("#email")?.value?.trim() || "";
    const assunto = form.querySelector("#assunto")?.value?.trim() || "";
    const comentario = form.querySelector("#comentario")?.value?.trim() || "";

    msgContainer.style.display = 'none';

    const lang = localStorage.getItem('selectedLanguage') || 'pt';
    const traducoes = window.translations ? window.translations[lang] : {};

    if (!nome || !email || !comentario) {
      customAlert(traducoes.formInvalid || "Por favor, preencha nome, e-mail e mensagem.", true);
      return;
    }

    btnSubmit.classList.add('loading');

    try {
      const resposta = await fetch("/api/email/contato", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome,
          email,
          assunto,
          comentario
        })
      });

      const dados = await resposta.json().catch(() => ({}));

      if (resposta.ok) {
        customAlert(dados.mensagem || traducoes.formSuccess || "Mensagem enviada com sucesso!");
        form.reset();
      } else {
        customAlert(
          dados.mensagem || traducoes.formError || "Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.",
          true
        );
      }
    } catch (erro) {
      console.error("Erro ao enviar formulário de contato:", erro);
      customAlert(traducoes.formConnectionError || "Não foi possível enviar sua mensagem no momento. Verifique sua conexão e tente novamente.",
        true
      );
    } finally {
      btnSubmit.classList.remove('loading');
    }
  });
});