async function vwLogin() {
  const form = document.getElementById("formLogin");
  const formData = new FormData(form);

  if (!Validar(formData)) {
    return false; // Validação falhou
  }

  const jsonData = {};
  formData.forEach((value, key) => {
    jsonData[key] = value;
  });

  try {
    const resp = await axios.post('login', JSON.stringify(jsonData), {
      headers: {
        "Content-Type": "application/json", 
      },
    });

    console.log("Valor RESP:", resp);

    if (resp.data.status === "ok") {
      Cookies.set('isLogged', true, { sameSite: 'strict' });
      window.open("/", "_self");
    } else {
      alert("Erro: " + resp.data.msg);
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Resposta:", error.response.data);
      alert('Erro: ' + error.response.data.msg || 'Ocorreu um erro no servidor');
    } else {
      alert('Erro desconhecido. Verifique a conexão.');
    }
  }
}
