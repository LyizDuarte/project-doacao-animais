const express = require('express');
const LoginController = require('../controllers/loginController');

const router = express.Router();

let ctrl = new LoginController();
router.get('/', ctrl.loginView);
router.post('/validar', ctrl.login);
router.get('/deslogar', ctrl.logout);


module.exports = router;