// ======================================
// MODELO BAJAS MÉDICAS
// ======================================

const mongoose = require('mongoose');

const bajaMedicaSchema = new mongoose.Schema({

    // ==========================
    // PERSONAL
    // ==========================

    personalId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: 'Personal',

        required: true

    },

    // ==========================
    // DATOS MÉDICOS
    // ==========================

    entidadMedica: {

        type: String,

        enum: [

            'COSSMIL',

            'CNS'

        ],

        required: true

    },

    tipo: {

        type: String,

        default: ''

    },

    medico: {

        type: String,

        default: ''

    },

    especialidad: {

        type: String,

        default: ''

    },

    numeroCertificado: {

        type: String,

        default: ''

    },

    diagnostico: {

        type: String,

        default: ''

    },

    fechaInicio: {

        type: Date,

        required: true

    },

    fechaFin: {

        type: Date,

        required: true

    },

    dias: {

        type: Number,

        default: 0

    },

    observacion: {

        type: String,

        default: ''

    },

    archivo: {

        type: String,

        default: ''

    },
    // ==========================
    // ESTADO DE LA BAJA
    // ==========================

    estado: {

        type: String,

        default: 'VIGENTE'

    },
    fechaRegistro: {

        type: Date,

        default: Date.now

    }

});

module.exports = mongoose.model(

    'BajaMedica',

    bajaMedicaSchema

);