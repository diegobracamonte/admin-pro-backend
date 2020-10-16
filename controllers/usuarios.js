const { response } = require('express');
const bcrypt = require('bcryptjs');


const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {
    const usuarios = await Usuario.find({}, 'nombre email role google');
    res.json({
        ok: true,
        usuarios
    });
};

const crearUsuarios = async (req, res) => {

    const { email, password, nombre } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }




        const usuario = new Usuario(req.body);
        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt)



        await usuario.save();

        const token = await generarJWT(usuario._id);

        return res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

};

const actualizarUsuarios = async (req, res = response) => {
    //validar token para saber si es el usuario correspondiente
    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }
        //actualizacion


        const {password,google,email,...campos} = req.body;
        if (usuarioDB.email === email) {
            delete campos.email;

        } else {
            const existeEmail = await Usuario.findOne({ email });

            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El correo ya existe en otro usuario'
                });
            }

        }
campos.email=email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        });
    }
}

const borrarUsuario= async (req, res=response) => {
    const uid=req.params.id;
    
    try {

        const usuarioDB =await Usuario.findById(uid);

if(!usuarioDB){
    return res.status(404).json({
        ok:false,
        msg:'No existe un usuario con ese id'
    });
}

await Usuario.findByIdAndDelete(uid);
        res.json({
            ok: true,
            msg:'Usuario eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

};

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuarios,
    borrarUsuario
}