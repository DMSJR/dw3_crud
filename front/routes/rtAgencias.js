var express = require('express');
var router = express.Router();
var agenciasApps = require("../apps/agencias/controller/ctlAgencias");



//Função necessária para evitar que usuários não autenticados acessem o sistema.
function authenticationMiddleware(req, res, next) {
    // Verificar se existe uma sessão válida.
    isLogged = req.session.isLogged;    
  
    if (!isLogged) {      
      res.redirect("/Login");
    }
    next();
}; 
  
/* GET métodos */
router.get('/ManutAgencias', authenticationMiddleware, agenciasApps.manutAgencias);
router.get('/InsertAgencias', authenticationMiddleware, agenciasApps.insertAgencias);
router.get('/ViewAgencias/:id', authenticationMiddleware, agenciasApps.ViewAgencias);
router.get('/UpdateAgencias/:id', authenticationMiddleware, agenciasApps.UpdateAgencia);

/* POST métodos */
router.post('/InsertAgencias', authenticationMiddleware, agenciasApps.insertAgencias);
router.post('/UpdateAgencias', authenticationMiddleware, agenciasApps.UpdateAgencia);
router.post('/DeleteAgencias', authenticationMiddleware, agenciasApps.DeleteAgencia);
// router.post('/viewAlunos', authenticationMiddleware, agenciasApps.viewAlunos);


module.exports = router;