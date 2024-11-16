var express = require('express');
var router = express.Router();
var agenciasApp = require("../apps/agencias/controller/ctlAgencias");

// Função necessária para evitar que usuários não autenticados acessem o sistema.
function authenticationMiddleware(req, res, next) {
    // Verificar se existe uma sessão válida.
    const isLogged = req.session.isLogged;

    if (!isLogged) {
        return res.redirect("/Login"); // Adicionado return para evitar continuar a execução
    }
    next();
}

/* GET métodos */
router.get('/ManutAgencias', authenticationMiddleware, agenciasApp.manutAgencias);
router.get('/InsertAgencias', authenticationMiddleware, agenciasApp.insertAgencias);
router.get('/ViewAgencias/:id', authenticationMiddleware, agenciasApp.ViewAgencias);
router.get('/UpdateAgencia/:id', authenticationMiddleware, agenciasApp.UpdateAgencia);

/* POST métodos */
router.post('/InsertAgencias', authenticationMiddleware, agenciasApp.insertAgencias);
router.post('/UpdateAgencia', authenticationMiddleware, agenciasApp.UpdateAgencia);
router.post('/DeleteAgencia', authenticationMiddleware, agenciasApp.DeleteAgencia);

module.exports = router;
