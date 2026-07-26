// Importamos express
const express = require('express');

// Creamos router
const router = express.Router();

// Importamos bcrypt
const bcrypt = require('bcrypt');

// Importamos modelo Usuario
const Usuario = require('../models/Usuario');
const Configuracion = require('../models/Configuracion');


// =========================================
// REGISTRO DE USUARIO
// =========================================

router.post('/registro', async (req, res) => {

    try {
        const configuracion = await Configuracion.findOne();


            if (
                configuracion &&
                configuracion.registroUsuarios === false
            ) {

                return res.status(403).send(
                    'Registro de usuarios deshabilitado por el administrador'
                );

            }
        // Obtenemos datos del formulario
        const {

            nombre,

            correo,

            password,

            rol

        } = req.body;

        // Verificamos si el correo ya existe
        const existeUsuario = await Usuario.findOne({ correo });

        if (existeUsuario) {
                    return res.send(
            'El correo ya está registrado'
        );
        }

        // Encriptamos contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        // Creamos nuevo usuario
        const nuevoUsuario = new Usuario({

            nombre,

            correo,

            password: passwordHash,

            rol: rol || 'usuario',

            permisos: rol === 'admin'
                ? {

                    editarFicha: true,

                    registrarPersonal: true,

                    editarPersonal: true,

                    eliminarPersonal: true,

                    registrarVacaciones: true,

                    editarVacaciones: true,

                    registrarLicencias: true,

                    editarLicencias: true,

                    registrarBajas: true,

                    editarBajas: true,

                    configuracionSistema: true,

                    administrarUsuarios: true

                }

                : {}

        });

        // Guardamos usuario
        await nuevoUsuario.save();

        return res.redirect('/login');

    } catch (error) {

        console.log(error);

        return res.send(
            'Error al registrar usuario'
);

    }

});

router.post('/login', async (req, res) => {

    try {

        const { correo, password } = req.body;

        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.json({
                ok: false,
                mensaje: 'Usuario no registrado'
            });
        }

        const passwordCorrecto = await bcrypt.compare(
            password,
            usuario.password
        );

        if (!passwordCorrecto) {
            return res.json({
                ok: false,
                mensaje: 'Contraseña incorrecta'
            });
        }

        req.session.usuario = {

            id: usuario._id,

            nombre: usuario.nombre,

            correo: usuario.correo,

            rol: usuario.rol,

            personalId: usuario.personalId,

            permisos: usuario.permisos

        };

        console.log(req.session.usuario);

        return res.json({
            ok: true,
            mensaje: 'Login correcto'
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            ok: false,
            mensaje: 'Error en el servidor'
        });

    }

});

// =========================================
// LOGOUT
// =========================================

router.get('/logout', (req, res) => {

    req.session.destroy((err) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                mensaje: 'Error'
            });

        }

        res.redirect('/login');

    });

});

router.get('/session', (req, res) => {

    if (!req.session.usuario) {
        return res.status(401).json({ ok: false });
    }

    res.json(req.session.usuario);

});
// Exportamos router
module.exports = router;