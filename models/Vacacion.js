const mongoose = require('mongoose');

const vacacionSchema = new mongoose.Schema({

    // ==========================
    // PERSONAL
    // ==========================

    personalId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: 'Personal',

        required: true

    },

    // ==========================
    // GESTIÓN
    // ==========================

    gestion: {

        type: Number,

        required: true

    },

    // ==========================
    // TIPO
    // ==========================

    tipo: {

        type: String,

        enum: [

            'VACACION',

            'PCV',

            'COLECTIVA'

        ],

        required: true

    },

    // ==========================
    // FECHAS
    // ==========================

    fechaInicio: {

        type: Date,

        required: true

    },

    fechaFin: {

        type: Date,

        required: true

    },

    // ==========================
    // DÍAS CONSUMIDOS
    // ==========================

    dias: {

        type: Number,

        default: 0

    },

    // ==========================
    // OBSERVACIONES
    // ==========================

    observacion: {

        type: String,

        default: ''

    },

    // ==========================
    // ESTADO
    // ==========================

    estado: {

        type: String,

        enum: [

            'PENDIENTE',

            'APROBADO',

            'RECHAZADO'

        ],

        default: 'PENDIENTE'

    },

    // ==========================
    // FECHA REGISTRO
    // ==========================

    fechaRegistro: {

        type: Date,

        default: Date.now

    }

});

module.exports = mongoose.model(
    'Vacacion',
    vacacionSchema
);