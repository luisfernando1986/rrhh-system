// ======================================
// MODELO CONFIGURACIÓN DEL SISTEMA
// ======================================

const mongoose = require('mongoose');

const configuracionSchema = new mongoose.Schema({

    registroUsuarios:{

            type:Boolean,

            default:false

        },

        registroPersonal:{

            type:Boolean,

            default:true

        },

        buscarPersonal:{

            type:Boolean,

            default:true

        },

        destinos:{

            type:Boolean,

            default:true

        },

        vacaciones:{

            type:Boolean,

            default:true

        },

        licencias:{

            type:Boolean,

            default:true

        },

        bajas:{

            type:Boolean,

            default:true

        },

        consultaGeneral:{

            type:Boolean,

            default:true

        }

});

module.exports = mongoose.model(

    'Configuracion',

    configuracionSchema

);