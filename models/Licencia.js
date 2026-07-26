// ======================================
// IMPORTAR MONGOOSE
// ======================================

const mongoose = require('mongoose');

// ======================================
// ESQUEMA DE LICENCIAS
// ======================================

const licenciaSchema = new mongoose.Schema({

    // ==================================
    // PERSONAL RELACIONADO
    // ==================================

    personalId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: 'Personal',

        required: true

    },

    // ==================================
    // GESTIÓN
    // ==================================

    gestion: {

        type: Number,

        required: true

    },

    // ==================================
    // TIPO DE LICENCIA
    // ==================================

    tipoLicencia: {

        type: String,

        required: true

    },

    // ==================================
    // FECHA INICIO
    // ==================================

    fechaInicio: {

        type: Date,

        required: true

    },

    // ==================================
    // FECHA FIN
    // ==================================

    fechaFin: {

        type: Date,

        required: true

    },

    // ==================================
    // DÍAS DE LICENCIA
    // ==================================

    dias: {

        type: Number,

        required: true

    },

    // ==================================
    // OBSERVACIONES
    // ==================================

    observacion: {

        type: String,

        default: ''

    },

    // ==================================
    // FECHA DE REGISTRO
    // ==================================

    fechaRegistro: {

        type: Date,

        default: Date.now

    }

});

// ======================================
// EXPORTAR MODELO
// ======================================

module.exports = mongoose.model(

    'Licencia',

    licenciaSchema

);