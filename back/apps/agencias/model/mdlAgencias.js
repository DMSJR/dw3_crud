const db = require("../../../database/databaseconfig");

const getAllAgencias = async () => {
  return (
    await db.query(
      "SELECT * FROM agencias where deleted = false ORDER BY nome ASC" 
    )
  ).rows;
};

const getAgenciaByID = async (agenciaIDPar) => {
  return (
    await db.query(
      "SELECT * FROM agencias WHERE agenciaid = $1 and deleted = false ORDER BY nome ASC",
      [agenciaIDPar]
    )
  ).rows;
};

const insertAgencia = async (agenciaREGPar) => {
  //@ Atenção: aqui já começamos a utilizar a variável msg para retornor erros de banco de dados.
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO agencias " + "values(default, $1, $2, $3, $4, $5, $6, $7, $8)",
        [
          agenciaREGPar.codigo,
          agenciaREGPar.nome,
          agenciaREGPar.endereco,
          agenciaREGPar.email,
          agenciaREGPar.telefone,
          agenciaREGPar.saldo,
          agenciaREGPar.dataabertura,
          agenciaREGPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlAgencias|insertAgencias] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const UpdateAgencia = async (agenciaREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE agencia SET " +
          "codigo = $2, " +
          "nome = $3, " +
          "endereco = $4, " +
          "email = $5, " +
          "telefone = $6, " +
          "saldo = $7, " +
          "dataabertura = $8 " +
          "deleted = $9" +
          "WHERE agenciaid = $1",
        [
            agenciaREGPar.codigo,
            agenciaREGPar.nome,
            agenciaREGPar.endereco,
            agenciaREGPar.email,
            agenciaREGPar.telefone,
            agenciaREGPar.saldo,
            agenciaREGPar.dataabertura,
            agenciaREGPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlAgencias|updateAgencia] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const DeleteAgencia = async (agenciaREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
    
  try {
    linhasAfetadas = (
    await db.query(
      "UPDATE agencias SET " + "deleted = true " + "WHERE agenciaid = $1",
      [agenciaREGPar.agenciaid]
    )
  ).rowCount;
} catch (error) {
  msg = "[mdlAgencias|deleteAgencia] " + error.detail;
  linhasAfetadas = -1;
}

return { msg, linhasAfetadas };
};

module.exports = {
  getAllAgencias,
  getAgenciaByID,
  insertAgencia,
  UpdateAgencia,
  DeleteAgencia,
};
