// =====================================
// IMPORTAR MONGOOSE
// =====================================

const mongoose = require('mongoose');


// =====================================
// ESQUEMA DESTINOS ANTERIORES
// =====================================

const destinoAnteriorSchema =

    new mongoose.Schema({

        // ==========================
        // PERSONAL RELACIONADO
        // ==========================

        personalId: {

            type:
                mongoose.Schema.Types.ObjectId,

            ref:
                'Personal',

            required:
                true

        },

        // ==========================
        // DESTINO GESTIÓN ANTERIOR
        // ==========================

        destinoGestion1: {

            type:
                String,

            default:
                ''

        },

        // ==========================
        // DESTINO DOS GESTIONES ATRÁS
        // ==========================

        destinoGestion2: {

            type:
                String,

            default:
                ''

        }

    });


// =====================================
// EXPORTAR MODELO
// =====================================

module.exports = mongoose.model(

    'DestinoAnterior',

    destinoAnteriorSchema

);