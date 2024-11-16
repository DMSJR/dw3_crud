const axios = require("axios");
const moment = require("moment");




const manutAgencias = async (req, res) =>
  (async () => {
    //@ Abre o formulário de manutenção de alunos
    const userName = req.session.userName;
    const token = req.session.token;
    //console.log("[ctlAlunos|ManutAlunos] Valor token:" + token)
    // try {
    const resp = await axios.get(process.env.SERVIDOR_DW3Back + "/getAllAgencias", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` // Set JWT token in the header
      }
    }).catch(error => {
      if (error.code === "ECONNREFUSED") {
        remoteMSG = "Servidor indisponível"

      } else if (error.code === "ERR_BAD_REQUEST") {
        remoteMSG = "Usuário não autenticado";

      } else {
        remoteMSG = error;
      }
      res.render("agencias/view/vwManutAgencias.njk", {
        title: "Manutenção de agências",
        data: null,
        erro: remoteMSG, //@ Caso tenha da erro, a mensagem será mostrada na página html como um Alert
        userName: userName,
      });
    });

    if (!resp) {
      return;
    }


    res.render("agencias/view/vwManutAgencias.njk", {
      title: "Manutenção de agencias",
      data: resp.data.registro,
      erro: null,
      userName: userName,
    });
  })();

const insertAgencias = async (req, res) =>
  (async () => {
    if (req.method == "GET") {
      const token = req.session.token;

      //@ Busca os cursos disponíveis
      const agencias = await axios.get(
        process.env.SERVIDOR_DW3Back + "/GetAllAgencias", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` // Set JWT token in the header
        }
      });

      return res.render("agencias/view/vwFCrAGencias.njk", {
        title: "Cadastro de agencias",
        data: null,
        erro: null, //@ Caso tenha da erro, a mensagem será mostrada na página html como um Alert
        agencia: agencias.data.registro,
        userName: null,
      });

    } else {
      //@ POST
      const regData = req.body;
      const token = req.session.token;

      try {
        // @ Enviando dados para o servidor Backend
        const response = await axios.post(process.env.SERVIDOR_DW3Back + "/insertAgencia", regData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          timeout: 5000, // @ 5 segundos de timeout
        });

        //console.log('[ctlAlunos|InsertAlunos] Dados retornados:', response.data);

        res.json({
          status: response.data.status,
          msg: response.data.status,
          data: response.data,
          erro: null,
        });
      } catch (error) {
        console.error('Erro ao inserir dados no servidor backend:', error.message);
        res.json({
          status: "Error",
          msg: error.message,
          data: response.data,
          erro: null,
        });
      }
    }
  })();

const ViewAgencias = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;
    try {
      if (req.method == "GET") {
        const id = req.params.id;
        oper = req.params.oper;
        parseInt(id);

        response = await axios.post(
          process.env.SERVIDOR_DW3Back + "/getAgenciaByID",
          {
            agenciaid: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        // console.log('[ctlAlunos|ViewAlunos] Dados retornados:', response.data);
        if (response.data.status == "ok") {
          //@ Busca os cursos disponíveis
          const agencias = await axios.get(
            process.env.SERVIDOR_DW3Back + "/GetAllAgencias", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}` // Set JWT token in the header
            }
          });

          response.data.registro[0].dataabertura = moment(response.data.registro[0].dataabertura).format(
            "YYYY-MM-DD"
          );

          res.render("agencias/view/vwFRUDrAgencias.njk", {
            title: "Visualização de agencias",
            data: response.data.registro[0],
            disabled: true,
            escola: agencias.data.registro,
            userName: userName,
          });
        } else {
          console.log("[ctlAgencias|ViewAgencias] ID de agencia não localizado!");
        }

      }
    } catch (erro) {
      res.json({ status: "[ctlAgencias.js|ViewAgencias] agencia não localizado!" });
      console.log(
        "[ctlAgencias.js|ViewAgencias] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

const UpdateAgencia = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;
    try {
      if (req.method == "GET") {
        const id = req.params.id;
        parseInt(id);

        response = await axios.post(
          process.env.SERVIDOR_DW3Back + "/getAgenciaByID",
          {
            agenciaid: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        // console.log('[ctlAlunos|UpdateAluno] Dados retornados:', response.data);
        if (response.data.status == "ok") {
          //@ Busca os cursos disponíveis


          response.data.registro[0].dataabertura = moment(response.data.registro[0].dataabertura).format(
            "YYYY-MM-DD"
          );

          res.render("agencias/view/vwFRUDrAgencias.njk", {
            title: "Atualização de dados de agencias",
            data: response.data.registro[0],
            disabled: false,
            userName: userName,
          });
        } else {
          console.log("[ctlAgencias|UpdateAgencia] Dados não localizados");
        }
      } else {
        //@ POST
        const regData = req.body;
        const token = req.session.token;
        // console.log("[ctlAlunos|UpdateAluno] Valor regData:", JSON.stringify(regData));
        try {
          // @ Enviando dados para o servidor Backend
          const response = await axios.post(process.env.SERVIDOR_DW3Back + "/updateAgencia", regData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            timeout: 5000, // @ 5 segundos de timeout
          });

          //console.log('[ctlAlunos|InsertAlunos] Dados retornados:', response.data);

          res.json({
            status: response.data.status,
            msg: response.data.status,
            data: response.data,
            erro: null,
          });
        } catch (error) {
          console.error('[ctlAgencias.js|UpdateAgencia] Erro ao atualizar dados de agencias no servidor backend:', error.message);
          res.json({
            status: "Error",
            msg: error.message,
            data: response.data,
            erro: null,
          });
        }
      }
    } catch (erro) {
      res.json({ status: "[ctlAgencias.js|UpdateAgencia] Agencia não localizada!" });
      console.log(
        "[ctlAgencias.js|UpdateAgencia] Try Catch: Erro não identificado",
        erro
      );
    }

  })();

const DeleteAgencia = async (req, res) =>
  (async () => {
    const regData = req.body;
    const token = req.session.token;

    try {
      const response = await axios.post(process.env.SERVIDOR_DW3Back + "/DeleteAgencia", regData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        timeout: 5000,
      });

      res.json({
        status: response.data.status,
        msg: response.data.status,
        data: response.data,
        erro: null,
      });
    } catch (error) {
      console.error('Erro na conexão:', error.response?.data || error.message);
      const erroMsg = error.response?.data || error.message;
      res.json({
        status: "Error",
        msg: "Falha ao conectar ao servidor backend",
        data: null,
        erro: erroMsg,
      });
    }
  })();

module.exports = {
  manutAgencias,
  insertAgencias,
  ViewAgencias,
  UpdateAgencia,
  DeleteAgencia
};
