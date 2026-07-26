const Configuracion = require('../models/Configuracion');


// ======================================
// VERIFICAR SI UN MÓDULO ESTÁ ACTIVO
// ======================================

function verificarConfiguracion(modulo) {


    return async (req, res, next) => {


        try {


            const configuracion = await Configuracion.findOne();


            if (!configuracion) {

                return res.status(500).send(
                    'No existe configuración del sistema'
                );

            }


            if (!configuracion[modulo]) {


                return res.status(403).send(
                    'Módulo deshabilitado por el administrador'
                );


            }


            next();


        } catch(error) {


            console.log(error);


            res.status(500).send(
                'Error verificando configuración'
            );


        }


    };


}


module.exports = verificarConfiguracion;