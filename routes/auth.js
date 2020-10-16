/*
    Rutas: '/api/login'
*/

const { Router, response } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/', [
    check('email', 'El email es obligaorio').isEmail(),
    check('password', 'El password es obligaorio').not().isEmpty(),
    validarCampos

], login);


module.exports = router;