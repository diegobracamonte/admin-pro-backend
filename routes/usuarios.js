/*
    Rutas: '/api/usuarios'
*/

const { Router, response } =require('express');
const { check } =require('express-validator');
const { validarCampos } =require('../middlewares/validar-campos');
const { getUsuarios,crearUsuarios,actualizarUsuarios,borrarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');


const router=Router();


router.get('/', validarJWT,getUsuarios);
    
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').not().isEmpty(),
    check('email','El email no es valido').isEmail(),
    validarCampos,
],crearUsuarios);

router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').not().isEmpty(),
    check('email','El email no es valido').isEmail(),
    check('role','El role es obligatorio').not().isEmpty(),
    validarCampos,
],actualizarUsuarios);


router.delete('/:id',borrarUsuario);

module.exports=router;