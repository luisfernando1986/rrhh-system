// ======================================
// IMPORTACIONES
// ======================================

const express = require('express');

const router = express.Router();

const path = require('path');

const BajaMedica = require('../models/BajaMedica');

const Personal = require('../models/Personal');


// ======================================
// MOSTRAR LISTA DE BAJAS MÉDICAS
// ======================================

router.get('/', (req, res) => {

    res.sendFile(

        path.join(

            __dirname,

            '../views/bajasMedicas/listaBajas.html'

        )

    );

});


// ======================================
// MOSTRAR FORMULARIO REGISTRAR BAJA
// ======================================

router.get('/registrar/:id', (req, res) => {

    res.sendFile(

        path.join(

            __dirname,

            '../views/bajasMedicas/registrarBaja.html'

        )

    );

});


// ======================================
// MOSTRAR FORMULARIO EDITAR
// ======================================

router.get('/editar/:id', (req, res) => {

    res.sendFile(

        path.join(

            __dirname,

            '../views/bajasMedicas/editarBaja.html'

        )

    );

});

// ======================================
// LISTAR PERSONAL CON ESTADO MÉDICO
// ======================================
router.get('/personal', async (req, res) => {

    try {

        if (!req.session.usuario) {

            return res.status(401).json({
                mensaje: 'Debe iniciar sesión'
            });

        }

        let personal = [];

        if (req.session.usuario.rol === 'admin') {

            personal = await Personal.find().sort({
                ordenGrado: 1,
                anioEgreso: 1,
                ordenInstituto: 1
            });

        } else {

            const Usuario = require('../models/Usuario');

            const usuario = await Usuario.findById(
                req.session.usuario.id
            );

            if (!usuario.personalId) {

                return res.json([]);

            }

            const persona = await Personal.findById(
                usuario.personalId
            );

            personal = persona ? [persona] : [];

        }

        const hoy = new Date();

        const lista = [];

        for (const persona of personal) {

            const bajas = await BajaMedica.find({
                personalId: persona._id
            });

            let estado = 'SIN BAJAS MÉDICAS';
            let color = 'verde';
            let requiereJunta = false;
            let enCurso = false;

            let totalBajas = bajas.length;
            let diasAcumulados = 0;

            for (const baja of bajas) {

                diasAcumulados += baja.dias || 0;

                if ((baja.dias || 0) > 30) {

                    requiereJunta = true;

                }

                const inicio = new Date(baja.fechaInicio);
                const fin = new Date(baja.fechaFin);

                if (hoy >= inicio && hoy <= fin) {

                    enCurso = true;

                }

            }

            if (requiereJunta) {

                estado = 'REQUIERE JUNTA MÉDICA';
                color = 'rojo';

            }

            else if (enCurso) {

                estado = 'BAJA MÉDICA EN CURSO';
                color = 'naranja';

            }

            lista.push({

                ...persona.toObject(),

                estadoMedico: estado,

                colorEstado: color,

                totalBajas,

                diasAcumulados

            });

        }

        res.json(lista);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            mensaje: 'Error al obtener personal'

        });

    }

});


// ======================================
// OBTENER PERSONAL POR ID
// ======================================

router.get('/personal/:id', async (req, res) => {

    try {

        if (!req.session.usuario) {

            return res.status(401).json({
                mensaje: 'Debe iniciar sesión'
            });

        }

        let personalId = req.params.id;

        if (req.session.usuario.rol !== 'admin') {

            const Usuario = require('../models/Usuario');

            const usuario = await Usuario.findById(
                req.session.usuario.id
            );

            if (!usuario.personalId) {

                return res.status(403).json({
                    mensaje: 'Usuario sin personal asignado'
                });

            }

            personalId = usuario.personalId;

        }

        const persona = await Personal.findById(personalId);

        if (!persona) {

            return res.status(404).json({
                mensaje: 'Personal no encontrado'
            });

        }

        res.json(persona);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: 'Error al obtener personal'
        });

    }

});
// ======================================
// REGISTRAR BAJA MÉDICA
// ======================================
router.post('/', async (req, res) => {

    try {

        if (!req.session.usuario) {

            return res.status(401).json({
                mensaje: 'Debe iniciar sesión'
            });

        }

        const datos = { ...req.body };

        // Usuario normal únicamente puede registrar su propia baja
        if (req.session.usuario.rol !== 'admin') {

            const Usuario = require('../models/Usuario');

            const usuario = await Usuario.findById(
                req.session.usuario.id
            );

            if (!usuario.personalId) {

                return res.status(403).json({
                    mensaje: 'Usuario sin personal asignado'
                });

            }

            datos.personalId = usuario.personalId;

        }

        const nuevaBaja = new BajaMedica(datos);

        await nuevaBaja.save();

        res.json({

            mensaje: 'Baja médica registrada'

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            mensaje: 'Error al registrar'

        });

    }

});
// ======================================
// HISTORIAL DE BAJAS
// ======================================

router.get('/personal/:id/registros', async (req, res) => {

    try {

        if (!req.session.usuario) {

            return res.status(401).json({
                mensaje: 'Debe iniciar sesión'
            });

        }

        let personalId = req.params.id;

        // Si no es administrador, solo puede consultar su propio historial
        if (req.session.usuario.rol !== 'admin') {

            const Usuario = require('../models/Usuario');

            const usuario = await Usuario.findById(
                req.session.usuario.id
            );

            if (!usuario.personalId) {

                return res.json([]);

            }

            personalId = usuario.personalId;

        }

        const registros = await BajaMedica.find({

            personalId

        }).sort({

            fechaInicio: -1

        });

        res.json(registros);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            mensaje: 'Error al obtener historial'

        });

    }

});
// ======================================
// OBTENER UNA BAJA
// ======================================

router.get('/:id', async (req, res) => {

    try {

        if (!req.session.usuario) {

            return res.status(401).json({
                mensaje: 'Debe iniciar sesión'
            });

        }

        const baja = await BajaMedica.findById(
            req.params.id
        );

        if (!baja) {

            return res.status(404).json({
                mensaje: 'Registro no encontrado'
            });

        }

        if (req.session.usuario.rol !== 'admin') {

            const Usuario = require('../models/Usuario');

            const usuario = await Usuario.findById(
                req.session.usuario.id
            );

            if (
                !usuario.personalId ||
                baja.personalId.toString() !== usuario.personalId.toString()
            ) {

                return res.status(403).json({
                    mensaje: 'No tiene permiso para consultar esta baja médica'
                });

            }

        }

        res.json(baja);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            mensaje: 'Error al obtener la baja médica'

        });

    }

});

// ======================================
// ACTUALIZAR BAJA
// ======================================

router.put('/:id', async (req, res) => {

    try {

        // ======================================
        // SOLO ADMINISTRADOR
        // ======================================

        if (

            !req.session.usuario ||

            req.session.usuario.rol !== 'admin'

        ) {

            return res.status(403).json({

                mensaje: 'Solo el administrador puede editar bajas médicas'

            });

        }

        

        await BajaMedica.findByIdAndUpdate(

            req.params.id,

            req.body

        );

        res.json({

            mensaje: 'Baja médica actualizada correctamente'

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            mensaje: 'Error al actualizar'

        });

    }

});

// ======================================
// ELIMINAR BAJA
// ======================================

router.delete('/:id', async (req, res) => {

    try {
        // ======================================
        // SOLO ADMINISTRADOR
        // ======================================

        if (

            !req.session.usuario ||

            req.session.usuario.rol !== 'admin'

        ) {

            return res.status(403).json({

                mensaje: 'Solo el administrador puede eliminar bajas médicas'

            });

        }
               

        

        await BajaMedica.findByIdAndDelete(req.params.id);

        res.json({

            mensaje: 'Baja médica eliminada correctamente'

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            mensaje: 'Error al eliminar'

        });

    }

});

// ======================================
// RESUMEN MÉDICO
// ======================================

router.get('/personal/:id/resumen', async (req, res) => {

    try {

        if (!req.session.usuario) {

            return res.status(401).json({
                mensaje: 'Debe iniciar sesión'
            });

        }

        let personalId = req.params.id;

        if (req.session.usuario.rol !== 'admin') {

            const Usuario = require('../models/Usuario');

            const usuario = await Usuario.findById(
                req.session.usuario.id
            );

            if (!usuario.personalId) {

                return res.json({
                    cantidad: 0,
                    dias: 0,
                    estado: 'NORMAL'
                });

            }

            personalId = usuario.personalId;

        }

        const registros = await BajaMedica.find({
            personalId
        });

        let diasAcumulados = 0;

        registros.forEach(registro => {

            diasAcumulados += registro.dias || 0;

        });

        res.json({

            cantidad: registros.length,

            dias: diasAcumulados,

            estado:
                diasAcumulados > 30
                    ? 'REQUIERE JUNTA MÉDICA'
                    : 'NORMAL'

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            mensaje: 'Error resumen'

        });

    }

});

module.exports = router;