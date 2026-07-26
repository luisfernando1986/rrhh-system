// ======================================
// IMPORTACIONES
// ======================================

const express = require('express');

const router = express.Router();

const Configuracion = require('../models/Configuracion');


// ======================================
// OBTENER CONFIGURACIÓN
// ======================================

router.get('/', async (req, res) => {

    // ======================================
    // SOLO ADMINISTRADOR
    // ======================================

    if (!req.session.usuario) {

        return res.status(401).json({

            mensaje: 'Debe iniciar sesión'

        });

    }

    if (req.session.usuario.rol !== 'admin') {

        return res.status(403).json({

            mensaje: 'No autorizado'

        });

    }

    try {

        const configuracion = await Configuracion.findOne();

        res.json(configuracion);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            mensaje: 'Error al obtener configuración'

        });

    }

});


// ======================================
// ACTUALIZAR CONFIGURACIÓN
// ======================================

router.put('/', async (req, res) => {

    // ======================================
    // SOLO ADMINISTRADOR
    // ======================================

    if (!req.session.usuario) {

        return res.status(401).json({

            mensaje: 'Debe iniciar sesión'

        });

    }

    if (req.session.usuario.rol !== 'admin') {

        return res.status(403).json({

            mensaje: 'No autorizado'

        });

    }

    try {

        const configuracion = await Configuracion.findOne();

        if (!configuracion) {

            return res.status(404).json({

                mensaje: 'No existe configuración'

            });

        }

        configuracion.registroUsuarios = req.body.registroUsuarios;

        configuracion.registroPersonal = req.body.registroPersonal;

        configuracion.buscarPersonal = req.body.buscarPersonal;

        configuracion.destinos = req.body.destinos;

        configuracion.vacaciones = req.body.vacaciones;

        configuracion.licencias = req.body.licencias;

        configuracion.bajas = req.body.bajas;

        configuracion.consultaGeneral = req.body.consultaGeneral;

        await configuracion.save();

        res.json({

            mensaje: 'Configuración actualizada'

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            mensaje: 'Error al actualizar'

        });

    }

});

module.exports = router;