// Função para capturar os parâmetros da URL (agora assíncrona)
async function getURLParams() {
  const params = new URLSearchParams(window.location.search);
  const paramObj = {};
  for (const [key, value] of params.entries()) {
    paramObj[key] = value;
  }
  return paramObj;
}

// Função que captura os valores de todos os campos do formulário (agora assíncrona)
async function captureFormFields(formId) {
  const form = document.getElementById(formId);
  const formData = {};

  // Percorre todos os elementos do formulário
  Array.from(form.elements).forEach((element) => {
    // Captura apenas os inputs que têm um "id" definido
    if (element.id) {
      formData[element.id] = element.value;
    }
  });

  return formData;
}

// Função assíncrona para envio do formulário
document
  .getElementById("contactForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Evita o comportamento padrão do submit

    try {
      // Obtém os valores dos campos do formulário de forma assíncrona
      const formFields = await captureFormFields("contactForm");

      // Obtém os parâmetros da URL de forma assíncrona
      const urlParams = await getURLParams();

      // Captura o nome da página e a URL atual
      const pageInfo = {
        pageTitle: document.title, // Captura o título da página
        pageURL: window.location.href, // Captura a URL da página
      };

      // Cria o objeto com os dados do formulário, os parâmetros da URL e as informações da página
      const formData = {
        formFields: formFields,
        urlParams: urlParams, // Adiciona os parâmetros da URL no corpo do JSON
        pageInfo: pageInfo, // Adiciona as informações da página no corpo do JSON
      };

      // Faz a chamada API do tipo POST de forma assíncrona
      const response = await fetch(
        "https://webhook.site/1c0613e7-608d-4f48-9a44-39697378fdbc",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          mode: "no-cors", // Adicionando o modo no-cors
        }
      );

      console.log(response); // Log para depuração

      // Redireciona para a página de obrigado **somente após** a chamada à API
      //window.location.href = "pagina-obrigado.html";
    } catch (error) {
      console.log("Erro ao enviar dados:", error);
    }
  });
