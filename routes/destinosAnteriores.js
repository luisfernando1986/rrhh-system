const express = require('express');
const router = express.Router();
const path = require('path');

const Personal = require('../models/Personal');


// ======================================
// VISTA
// ======================================
router.get('/', (req, res) => {
    res.sendFile(
        path.join(__dirname, '../views/destinosAnteriores/listaDestinos.html')
    );
});

// ======================================
// LISTAR PERSONAL SEGÚN USUARIO
// ======================================

router.get('/listado', async (req, res) => {

    try {

        if (!req.session.usuario) {

            return res.status(401).json({

                mensaje: 'Debe iniciar sesión'

            });

        }


        let data = [];


        // ==================================
        // ADMINISTRADOR
        // VE TODO EL PERSONAL
        // ==================================

        if (req.session.usuario.rol === 'admin') {


            data = await Personal.find()

            .sort({

                ordenGrado: 1,

                anioEgreso: 1

            });


        }


        // ==================================
        // USUARIO NORMAL
        // SOLO SU INFORMACIÓN
        // ==================================

        else {


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


            data = persona ? [persona] : [];


        }


        res.json(data);


    }

    catch(error){


        console.log(error);


        res.status(500).json({

            mensaje:'Error destinos'

        });


    }

});


// ======================================
// OBTENER UNO
// ======================================
router.get('/:id', async (req, res) => {

    try {

        if (!req.session.usuario) {

            return res.status(401).json({
                mensaje: 'Debe iniciar sesión'
            });

        }

        let id = req.params.id;

        // Usuario normal solo consulta sus propios datos
        if (req.session.usuario.rol !== 'admin') {

            const Usuario = require('../models/Usuario');

            const usuario = await Usuario.findById(
                req.session.usuario.id
            );

            if (!usuario.personalId) {

                return res.status(403).json({
                    mensaje: 'Sin personal asignado'
                });

            }

            id = usuario.personalId;

        }

        const data = await Personal.findById(id);

        res.json(data);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: 'Error'
        });

    }

});

// ======================================
// ACTUALIZAR DESTINOS
// ======================================
router.put('/:id', async (req, res) => {

    try {

        if (!req.session.usuario) {

            return res.status(401).json({

                mensaje: 'Debe iniciar sesión'

            });

        }


        let idActualizar = req.params.id;


        // ==========================
        // USUARIO NORMAL
        // ==========================

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


            // Solo puede modificar su propio registro

            idActualizar = usuario.personalId;


        }



        const actualizado = await Personal.findByIdAndUpdate(

            idActualizar,

            {

                destinoGestionAnterior:

                    req.body.destinoGestionAnterior,


                destinoHaceDosGestiones:

                    req.body.destinoHaceDosGestiones

            },

            {

                new: true

            }

        );


        if (!actualizado) {

            return res.status(404).json({

                mensaje: 'Personal no encontrado'

            });

        }


        res.json({

            mensaje: 'Destinos actualizados correctamente',

            datos: actualizado

        });


    }


    catch(error) {


        console.log(error);


        res.status(500).json({

            mensaje: 'Error al actualizar destinos'

        });


    }


});

module.exports = router;