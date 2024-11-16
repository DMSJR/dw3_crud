const mdlAgencias = require("../model/mdlAgencias");

const getAllAgencias = (req, res) =>
  (async () => {
    let registro = await mdlAgencias.getAllAgencias();
    for (let i = 0; i < registro.length; i++) {
      const row = registro[i]; // Current row      
      const formattedDate = row.dataabertura.toISOString().split('T')[0];
      row.dataabertura = formattedDate;
      
    }
    res.json({ status: "ok", "registro": registro });
  })();

const getAgenciaByID = (req, res) =>
  (async () => {
    const agenciaID = parseInt(req.body.agenciaid);
    let registro = await mdlAgencias.getAgenciaByID(agenciaID);


    res.json({ status: "ok", "registro": registro });
  })();

const insertAgencia = (request, res) =>
  (async () => {
    //@ Atenção: aqui já começamos a utilizar a variável msg para retornar erros de banco de dados.
    const agenciaREG = request.body;
    let { msg, linhasAfetadas } = await mdlAgencias.insertAgencia(agenciaREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const updateAgencia = (request, res) =>
  (async () => {
    const agenciaREG = request.body;
    let { msg, linhasAfetadas } = await mdlAgencias.UpdateAgencia(agenciaREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const deleteAgencia = (request, res) =>
  (async () => {
    const agenciaREG = request.body;
    let { msg, linhasAfetadas } = await mdlAgencias.DeleteAgencia(agenciaREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

module.exports = {
  getAllAgencias,
  getAgenciaByID,
  insertAgencia,
  updateAgencia,
  deleteAgencia
};
