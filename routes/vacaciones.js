const express = require('express');

const router = express.Router();

const path = require('path');

const Vacacion = require('../models/Vacacion');

const Personal = require('../models/Personal');

// ======================================
// DIAS CORRIDOS
// ======================================

function calcularDiasCorridos(

    fechaInicio,

    fechaFin

) {

    const inicio =

        new Date(fechaInicio);

    const fin =

        new Date(fechaFin);

    const diferencia =

        fin - inicio;

    return (

        Math.floor(

            diferencia /

            (1000 * 60 * 60 * 24)

        ) + 1

    );

}

// ======================================
// DIAS HABILES
// ======================================
function calcularDiasHabiles(

    fechaInicio,

    fechaFin

) {

    let dias = 0;

    let fecha =

        new Date(
            fechaInicio + 'T12:00:00'
        );

    const fin =

        new Date(
            fechaFin + 'T12:00:00'
        );

    while (fecha <= fin) {

        const diaSemana =

            fecha.getDay();

        if (

            diaSemana !== 0 &&

            diaSemana !== 6

        ) {

            dias++;

        }

        fecha.setDate(

            fecha.getDate() + 1

        );

    }

    return dias;

}

router.get(

    '/vacaciones',

    (req, res) => {

        res.sendFile(

            path.join(

                __dirname,

                '../views/vacaciones/listaVacaciones.html'

            )

        );

    }

);

router.get('/', async (req, res) => {

    try {


        if (!req.session.usuario) {

            return res.status(401).json({

                mensaje:'Debe iniciar sesión'

            });

        }



        let personal;



        // ==========================
        // ADMINISTRADOR
        // ==========================

        if (req.session.usuario.rol === 'admin') {


            personal = await Personal.find()

                .sort({

                    ordenGrado:1,

                    anioEgreso:1,

                    ordenInstituto:1,

                    antiguedadGrado:1

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


            const persona = await Personal.findById(

                usuario.personalId

            );


            personal = persona ? [persona] : [];


        }



        const resultado = [];


        for (const persona of personal) {


            const registros = await Vacacion.find({

                personalId: persona._id

            });



            let diasProgramados = 0;



            registros.forEach(registro=>{


                if (

                    registro.tipo === 'VACACION' ||

                    registro.tipo === 'PCV' ||

                    registro.tipo === 'COLECTIVA'

                ){

                    diasProgramados += registro.dias || 0;

                }


            });



            resultado.push({

                ...persona.toObject(),

                diasProgramados

            });


        }



        res.json(resultado);



    }

    catch(error){


        console.log(error);


        res.status(500).json({

            mensaje:'Error al cargar'

        });


    }


});
// ======================================
// OBTENER PERSONAL
// URL FINAL:
// /api/vacaciones/personal/:id
// ======================================

router.get(
    '/personal/:id',
        async (req, res) => {

            try {

                const personal =

                    await Personal.findById(

                        req.params.id

                    );

                res.json(personal);

            }

            catch (error) {

                console.log(error);

                res.status(500).json({

                    mensaje:

                        'Error al obtener personal'

                });

            }

        }

    );
// ======================================
// FORMULARIO PROGRAMAR VACACIÓN
// ======================================

router.get(

    '/vacaciones/programar/:id',

    (req, res) => {

        res.sendFile(

            path.join(

                __dirname,

                '../views/vacaciones/programarVacacion.html'

            )

        );

    }

);
// ======================================
// VENTANA EDITAR VACACIÓN
// ======================================

router.get(

    '/vacaciones/editar/:id',

    (req, res) => {

        res.sendFile(

            path.join(

                __dirname,

                '../views/vacaciones/editarVacacion.html'

            )

        );

    }

);
// ======================================
// OBTENER PERSONAL PARA PROGRAMAR
// ======================================


// ======================================
// GUARDAR VACACIÓN
// ======================================


// GUARDAR VACACIÓN
router.post('/', async (req, res) => {

        try {
            let dias = 0;

                if (

                    req.body.tipo === 'VACACION'

                ) {

                    dias =

                        calcularDiasHabiles(

                            req.body.fechaInicio,

                            req.body.fechaFin

                        );

                }

                else {

                    dias =

                        calcularDiasCorridos(

                            req.body.fechaInicio,

                            req.body.fechaFin

                        );

                }
            const nuevaVacacion =

                new Vacacion({

                    personalId:

                        req.body.personalId,

                    gestion:

                        new Date()
                        .getFullYear(),

                    tipo:

                        req.body.tipo,

                    fechaInicio:

                        req.body.fechaInicio,

                    fechaFin:

                        req.body.fechaFin,

                    dias:

                        dias,

                    observacion:

                        req.body.observacion

                });

            await nuevaVacacion.save();

            res.json({

                mensaje:

                    'Vacación registrada'

            });

        }

        catch (error) {

            console.log(error);

            res.status(500).json({

                mensaje:

                    'Error al guardar'

            });

        }

    }

);

// ======================================
// LISTADO GENERAL DE VACACIONES
// PARA FILTROS Y ESTADISTICAS
// ======================================

router.get('/listado', async(req,res)=>{

    try {

        if(!req.session.usuario){

            return res.status(401).json({
                mensaje:'Debe iniciar sesión'
            });

        }


        let filtro={};


        if(req.session.usuario.rol !== 'admin'){


            const Usuario =
            require('../models/Usuario');


            const usuario =
            await Usuario.findById(
                req.session.usuario.id
            );


            filtro.personalId =
            usuario.personalId;

        }


        const vacaciones = await Vacacion.find(filtro)

        .populate('personalId')

        .sort({

            fechaInicio:-1

        });


        res.json(vacaciones);


    }

    catch(error){

        console.log(error);

        res.status(500).json({

            mensaje:'Error al listar vacaciones'

        });

    }


});



// ======================================
// LISTAR HISTORIAL DE VACACIONES
// DE UN SOLO MILITAR
// URL:
// /api/vacaciones/personal/:id/registros
// ======================================

router.get(

    '/personal/:id/registros',

    async (req, res) => {

        try {

            const registros =

                await Vacacion.find({

                    personalId:

                        req.params.id

                })

                .sort({

                    fechaInicio: -1

                });

            res.json(

                registros

            );

        }

        catch (error) {

            console.log(error);

            res.status(500).json({

                mensaje:

                    'Error al listar registros'

            });

        }

    }

);

     
// ======================================
// RESUMEN DE VACACIONES
// ======================================

router.get('/personal/:id/resumen', async (req, res) => {

        try {

            const personal =

                await Personal.findById(
                    req.params.id
                );

            const registros =

                await Vacacion.find({

                    personalId:
                        req.params.id

                });

            let corresponde = 0;

            const anios = personal.aniosServicio || 0;

            if (anios >= 1 && anios < 5)
                corresponde = 15;

            else if (anios >= 5 && anios < 10)
                corresponde = 20;

            else if (anios >= 10 && anios < 20)
                corresponde = 25;

            else if (anios >= 20)
                corresponde = 30;

            let usados = 0;
            let programados = 0;

            const hoy = new Date();

            registros.forEach(

                r => {

                    const fin =

                        new Date(
                            r.fechaFin
                        );

                    if (fin < hoy) {

                        usados +=

                            r.dias;

                    }

                    else {

                        programados +=

                            r.dias;

                    }

                }

            );

            res.json({

                corresponde,

                usados,

                programados,

                disponible:

                    corresponde -
                    usados -
                    programados

            });

        }

        catch (error) {

            console.log(error);

            res.status(500).json({

                mensaje:
                    'Error resumen'

            });

        }

    }

);

// ======================================
// ELIMINAR VACACIÓN
// ======================================


// ELIMINAR
router.delete('/:id', async (req, res) => {

    try {

        // ==================================
        // SOLO ADMIN PUEDE ELIMINAR
        // ==================================

        if (
            !req.session.usuario ||
            req.session.usuario.rol !== 'admin'
        ) {

            return res.status(403).json({

                mensaje:
                'No tiene permiso para eliminar vacaciones'

            });

        }


        await Vacacion.findByIdAndDelete(

            req.params.id

        );


        res.json({

            mensaje:
            'Registro eliminado'

        });


    }

    catch(error){

        console.log(error);


        res.status(500).json({

            mensaje:
            'Error al eliminar'

        });

    }

});



// ======================================
// ACTUALIZAR VACACIÓN
// ======================================


// ACTUALIZAR
router.put('/:id', async (req, res) => {

    try {


        // ==================================
        // SOLO ADMIN PUEDE EDITAR
        // ==================================

        if (
            !req.session.usuario ||
            req.session.usuario.rol !== 'admin'
        ) {

            return res.status(403).json({

                mensaje:
                'No tiene permiso para editar vacaciones'

            });

        }

            await Vacacion.findByIdAndUpdate(

                req.params.id,

                {

                    tipo:

                        req.body.tipo,

                    fechaInicio:

                        req.body.fechaInicio,

                    fechaFin:

                        req.body.fechaFin,

                    dias:

                        req.body.dias,

                    observacion:

                        req.body.observacion

                }

            );

            res.json({

                mensaje:

                    'Registro actualizado'

            });

        }

        catch (error) {

            console.log(error);

            res.status(500).json({

                mensaje:

                    'Error al actualizar'

            });

        }

    }

);


// ======================================
// ESTADÍSTICAS DE VACACIONES
// ======================================

router.get('/estadisticas', async(req,res)=>{

    try {


        if(!req.session.usuario){

            return res.status(401).json({

                mensaje:'Debe iniciar sesión'

            });

        }


        let filtro={};


        // USUARIO NORMAL
        // SOLO SUS VACACIONES

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
                    programadas:0,
                    porTipo:{}

                });

            }


            filtro.personalId =
            usuario.personalId;


        }



        const hoy = new Date();



        // TOTAL

        const total =
        await Vacacion.countDocuments(filtro);



        // EN CURSO

        const activas =
        await Vacacion.countDocuments({

            ...filtro,

            fechaInicio:{
                $lte:hoy
            },

            fechaFin:{
                $gte:hoy
            }

        });



        // FINALIZADAS

        const vencidas =
        await Vacacion.countDocuments({

            ...filtro,

            fechaFin:{
                $lt:hoy
            }

        });



        // PROGRAMADAS FUTURAS

        const programadas =
        await Vacacion.countDocuments({

            ...filtro,

            fechaInicio:{
                $gt:hoy
            }

        });



        // POR TIPO

        const agrupado =
        await Vacacion.aggregate([


            {
                $match:filtro
            },


            {

                $group:{


                    _id:"$tipo",


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

            programadas,

            porTipo

        });



    }

    catch(error){


        console.log(error);


        res.status(500).json({

            mensaje:'Error estadísticas vacaciones'

        });


    }


});




module.exports = router;
