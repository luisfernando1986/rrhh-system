// Importamos mongoose
const mongoose = require('mongoose');

// Creamos el esquema del usuario
const usuarioSchema = new mongoose.Schema({

    // Nombre completo
    nombre: {
        type: String,
        required: true
    },

    // Correo electrónico
    correo: {
        type: String,
        required: true,
        unique: true
    },

    // Contraseña
    password: {
        type: String,
        required: true
    },

    // Rol del usuario
    rol: {
        type: String,
        default: 'usuario'
    },
    // =====================================
    // ESTADO DE LA CUENTA
    // =====================================

    activo: {

        type: Boolean,

        default: true

    },

    // =====================================
    // PERSONAL RELACIONADO
    // =====================================

    personalId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: 'Personal',

        default: null

    },

    // =====================================
    // PERMISOS DEL USUARIO
    // =====================================

    permisos: {

        editarFicha: {
            type: Boolean,
            default: false
        },

        registrarPersonal: {
            type: Boolean,
            default: false
        },

        editarPersonal: {
            type: Boolean,
            default: false
        },

        eliminarPersonal: {
            type: Boolean,
            default: false
        },

        registrarVacaciones: {
            type: Boolean,
            default: false
        },

        editarVacaciones: {
            type: Boolean,
            default: false
        },

        registrarLicencias: {
            type: Boolean,
            default: false
        },

        editarLicencias: {
            type: Boolean,
            default: false
        },

        registrarBajas: {
            type: Boolean,
            default: false
        },

        editarBajas: {
            type: Boolean,
            default: false
        },

        configuracionSistema: {
            type: Boolean,
            default: false
        },

        administrarUsuarios: {
            type: Boolean,
            default: false
        }

    },
    // Fecha de creación
    fecha: {
        type: Date,
        default: Date.now
    }

});

// Exportamos el modelo
module.exports = mongoose.model('Usuario', usuarioSchema);