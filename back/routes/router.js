const express = require("express");
const routerApp = express.Router();

const appAgencias = require("../apps/agencias/controller/ctlAgencias");
const appLogin = require("../apps/login/controller/ctlLogin");




// middleware that is specific to this router
routerApp.use((req, res, next) => {
  next();
});



//Rotas de Alunos
routerApp.get("/getAllAgencias", appLogin.AutenticaJWT, appAgencias.getAllAgencias);
routerApp.post("/getAgenciaByID", appLogin.AutenticaJWT, appAgencias.getAgenciaByID);
routerApp.post("/insertAgencia", appLogin.AutenticaJWT, appAgencias.insertAgencia);
routerApp.post("/updateAgencia", appLogin.AutenticaJWT, appAgencias.updateAgencia);
routerApp.post("/DeleteAgencia", appLogin.AutenticaJWT, appAgencias.deleteAgencia);

// Rota Login
routerApp.post("/Login", appLogin.Login);
routerApp.post("/Logout", appLogin.Logout);



module.exports = routerApp;
