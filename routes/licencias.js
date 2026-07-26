const express = require('express');
const router = express.Router();
const path = require('path');

const Licencia = require('../models/Licencia');
const Personal = require('../models/Personal');


// ======================================
// VISTA PRINCIPAL
// ======================================
router.get('/', (req, res) => {
    res.sendFile(
        path.join(__dirname, '../views/licencias/listaLicencias.html')
    );
});


// ======================================
// REGISTRAR VISTA
// ======================================
router.get('/registrar', (req, res) => {
    res.sendFile(
        path.join(__dirname, '../views/licencias/registrarLicencia.html')
    );
});

// ======================================
// EDITAR VISTA
// ======================================
router.get('/editar/:id', (req, res) => {

    res.sendFile(

        path.join(

            __dirname,

            '../views/licencias/editarLicencia.html'

        )

    );

});

// ======================================
// LISTAR PERSONAL
// ======================================
router.get('/personal', async (req, res) => {

    try {

        if (!req.session.usuario) {

            return res.status(401).json({

                mensaje: 'Debe iniciar sesión'

            });

        }

        // ==========================
        // ADMINISTRADOR
        // ==========================

        if (req.session.usuario.rol === 'admin') {

            const personal = await Personal.find().sort({

                ordenGrado: 1,
                anioEgreso: 1

            });

            return res.json(personal);

        }

        // ==========================
        // USUARIO NORMAL
        // ==========================

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

        res.json(

            persona ? [persona] : []

        );

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            mensaje: 'Error al cargar personal'

        });

    }

});


// ======================================
// GUARDAR LICENCIA
// ======================================
router.post('/', async (req, res) => {
    try {

        const { personalId, tipoLicencia, fechaInicio, dias, observacion } = req.body;

        const inicio = new Date(fechaInicio);
        const fin = new Date(inicio);
        fin.setDate(inicio.getDate() + Number(dias) - 1);

        const nueva = new Licencia({
            personalId,
            gestion: new Date().getFullYear(),
            tipoLicencia,
            fechaInicio,
            fechaFin: fin,
            dias,
            observacion
        });

        await nueva.save();

        res.json({ mensaje: 'Licencia registrada' });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al guardar licencia' });
    }
});


// ======================================
// LISTAR LICENCIAS
// ======================================

router.get('/listado', async (req, res) => {

    try {

        if (!req.session.usuario) {

            return res.status(401).json({

                mensaje: 'Debe iniciar sesión'

            });

        }

        let licencias;

        // ==========================
        // ADMINISTRADOR
        // ==========================

        if (req.session.usuario.rol === 'admin') {

            licencias = await Licencia.find()

                .populate('personalId')

                .sort({

                    fechaInicio: -1

                });

        }

        else {

            // ==========================
            // USUARIO NORMAL
            // ==========================

            const Usuario = require('../models/Usuario');

            const usuario = await Usuario.findById(

                req.session.usuario.id

            );

            if (!usuario.personalId) {

                return res.json([]);

            }

            licencias = await Licencia.find({

                personalId: usuario.personalId

            })

            .populate('personalId')

            .sort({

                fechaInicio: -1

            });

        }

        res.json(licencias);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            mensaje: 'Error al listar licencias'

        });

    }

});


// ======================================
// ACTUALIZAR LICENCIA
// ======================================

router.put('/:id', async (req,res)=>{

    try {
        if (!req.session.usuario) {

            return res.status(401).json({

                mensaje: 'Debe iniciar sesión'

            });

        }

        const {
            personalId,
            tipoLicencia,
            fechaInicio,
            dias,
            observacion

        } = req.body;



        const inicio = new Date(fechaInicio);

        const fin = new Date(inicio);

        fin.setDate(
            inicio.getDate() + Number(dias) - 1
        );



        await Licencia.findByIdAndUpdate(

            req.params.id,

            {

                personalId,

                tipoLicencia,

                fechaInicio,

                fechaFin: fin,

                dias,

                observacion

            }

        );


        res.json({

            mensaje:'Licencia actualizada correctamente'

        });


    }

    catch(error){


        console.log(error);


        res.status(500).json({

            mensaje:'Error al actualizar licencia'

        });


    }

});

// ======================================
// ELIMINAR
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

                mensaje: 'No tiene permiso para eliminar licencias'

            });

        }

        await Licencia.findByIdAndDelete(

            req.params.id

        );

        res.json({

            mensaje: 'Licencia eliminada'

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
// ESTADÍSTICAS LICENCIAS (DASHBOARD)
// ======================================
router.get('/estadisticas', async (req,res)=>{

    try{


        if(!req.session.usuario){

            return res.status(401).json({
                mensaje:'Debe iniciar sesión'
            });

        }


        let filtro={};


        // ==========================
        // USUARIO NORMAL
        // ==========================

        if(req.session.usuario.rol !== 'admin'){


            const Usuario =
            require('../models/Usuario');


            const usuario =
            await Usuario.findById(
                req.session.usuario.id
            );


            if(!usuario.personalId){

                return res.json({

                    total:0,
                    activas:0,
                    vencidas:0,
                    porTipo:{}

                });

            }


            filtro.personalId =
            usuario.personalId;


        }



        const hoy = new Date();


        const total =
        await Licencia.countDocuments(filtro);



        const activas =
            await Licencia.countDocuments({

                ...filtro,

                fechaInicio:{
                    $lte:hoy
                },

                fechaFin:{
                    $gte:hoy
                }

            });



        const vencidas =
        await Licencia.countDocuments({

            ...filtro,

            fechaFin:{
                $lt:hoy
            }

        });



        const agrupado =
        await Licencia.aggregate([

            {
                $match:filtro
            },

            {

                $group:{

                    _id:"$tipoLicencia",

                    total:{
                        $sum:1
                    }

                }

            }

        ]);



        const porTipo={};


        agrupado.forEach(item=>{

            porTipo[item._id]=item.total;

        });



        res.json({

            total,

            activas,

            vencidas,

            porTipo

        });



    }
    catch(error){

        console.log(error);


        res.status(500).json({

            mensaje:'Error en estadísticas'

        });

    }


});


// ======================================
// OBTENER LICENCIA POR ID
// ======================================

router.get('/:id', async(req,res)=>{

    try{
        if (!req.session.usuario) {

                return res.status(401).json({

                    mensaje: 'Debe iniciar sesión'

                });

            }
        const licencia = await Licencia.findById(

            req.params.id

        )
        .populate('personalId');


        res.json(licencia);


    }
    catch(error){

        console.log(error);

        res.status(500).json({

            mensaje:'Error al obtener licencia'

        });

    }

});

module.exports = router;