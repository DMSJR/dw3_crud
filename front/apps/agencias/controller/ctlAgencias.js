const axios = require("axios");
const moment = require("moment");




const manutAgencias = async (req, res) =>
  (async () => {
    //@ Abre o formulário de manutenção de agencias
    const userName = req.session.userName;
    const token = req.session.token;
    //console.log("[ctlAgencias|ManutAgencias] Valor token:" + token)
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
        title: "Manutenção de agencias",
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
      const cursos = await axios.get(
        process.env.SERVIDOR_DW3Back + "/GetAllCursos", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` // Set JWT token in the header
        }
      });

      return res.render("agencias/view/vwFCrAgencias.njk", {
        title: "Cadastro de agencias",
        data: null,
        erro: null, //@ Caso tenha da erro, a mensagem será mostrada na página html como um Alert
        curso: cursos.data.registro,
        userName: null,
      });

    } else {
      //@ POST
      const regData = req.body;
      const token = req.session.token;

      try {
        // @ Enviando dados para o servidor Backend
        const response = await axios.post(process.env.SERVIDOR_DW3Back + "/insertAgencias", regData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          timeout: 5000, // @ 5 segundos de timeout
        });

        //console.log('[ctlAgencias|InsertAgencias] Dados retornados:', response.data);

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
            alunoid: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        // console.log('[ctlAgencias|ViewAgencias] Dados retornados:', response.data);
        if (response.data.status == "ok") {
          //@ Busca os cursos disponíveis
          const cursos = await axios.get(
            process.env.SERVIDOR_DW3Back + "/GetAllCursos", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}` // Set JWT token in the header
            }
          });

          response.data.registro[0].datanascimento = moment(response.data.registro[0].datanascimento).format(
            "YYYY-MM-DD"
          );

          res.render("agencias/view/vwFRUDrAgencias.njk", {
            title: "Visualização de agencias",
            data: response.data.registro[0],
            disabled: true,
            curso: cursos.data.registro,
            userName: userName,
          });
        } else {
          console.log("[ctlAgencias|ViewAgencias] ID de aluno não localizado!");
        }

      }
    } catch (erro) {
      res.json({ status: "[ctlAgencias.js|ViewAgencias] Agencia não localizado!" });
      console.log(
        "[ctlAgencias.js|viewAgencias] Try Catch: Erro não identificado",
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
            alunoid: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        // console.log('[ctlAgencias|UpdateAgencia] Dados retornados:', response.data);
        if (response.data.status == "ok") {
          //@ Busca os cursos disponíveis
          const cursos = await axios.get(
            process.env.SERVIDOR_DW3Back + "/GetAllCursos", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}` // Set JWT token in the header
            }
          });

          response.data.registro[0].datanascimento = moment(response.data.registro[0].datanascimento).format(
            "YYYY-MM-DD"
          );

          res.render("agencias/view/vwFRUDrAgencias.njk", {
            title: "Atualização de dados de agencias",
            data: response.data.registro[0],
            disabled: false,
            curso: cursos.data.registro,
            userName: userName,
          });
        } else {
          console.log("[ctlAgencias|UpdateAgencia] Dados não localizados");
        }
      } else {
        //@ POST
        const regData = req.body;
        const token = req.session.token;
        // console.log("[ctlAgencias|UpdateAgencia] Valor regData:", JSON.stringify(regData));
        try {
          // @ Enviando dados para o servidor Backend
          const response = await axios.post(process.env.SERVIDOR_DW3Back + "/updateAgencias", regData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            timeout: 5000, // @ 5 segundos de timeout
          });

          //console.log('[ctlAgencias|InsertAgencias] Dados retornados:', response.data);

          res.json({
            status: response.data.status,
            msg: response.data.status,
            data: response.data,
            erro: null,
          });
        } catch (error) {
          console.error('[ctlAgencias.js|UpdateAgencia] Erro ao atualiza dados de agencias no servidor backend:', error.message);
          res.json({
            status: "Error",
            msg: error.message,
            data: response.data,
            erro: null,
          });
        }
      }
    } catch (erro) {
      res.json({ status: "[ctlAgencias.js|UpdateAgencia] Agencia não localizado!" });
      console.log(
        "[ctlAgencias.js|UpdateAgencia] Try Catch: Erro não identificado",
        erro
      );
    }

  })();

const DeleteAgencia = async (req, res) =>
  (async () => {
    //@ POST
    const regData = req.body;
    const token = req.session.token;
    //console.log("[ctlAgencias|DeleteAgencia] Valor regData:", JSON.stringify(regData));

    try {
      // @ Enviando dados para o servidor Backend
      const response = await axios.post(process.env.SERVIDOR_DW3Back + "/DeleteAgencias", regData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        timeout: 5000, // @ 5 segundos de timeout
      });

      //console.log('[ctlAgencias|DeleteAgencia] Dados retornados:', response.data);

      res.json({
        status: response.data.status,
        msg: response.data.status,
        data: response.data,
        erro: null,
      });
    } catch (error) {
      console.error('[ctlAgencias.js|DeleteAgencia] Erro ao deletar dados de agencias no servidor backend:', error.message);
      res.json({
        status: "Error",
        msg: error.message,
        data: response.data,
        erro: null,
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
