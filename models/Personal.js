// Importamos mongoose
const mongoose = require('mongoose');


// =====================================
// ESQUEMA DE HIJOS
// =====================================

const hijoSchema = new mongoose.Schema({

    // Nombre completo del hijo
    nombre: {
        type: String
    },

    // Fecha de nacimiento
    fechaNacimiento: {
        type: Date
    },

    // Sexo
    sexo: {
        type: String
    },

    // Lugar de nacimiento
    lugarNacimiento: {
        type: String
    }

});


// =====================================
// ESQUEMA DE MEMORÁNDUMS
// =====================================

const memorandumSchema = new mongoose.Schema({

    // Tipo de memorándum
    tipo: {
        type: String
    },

    // Número del memorándum
    numero: {
        type: String
    },

    // Fecha
    fecha: {
        type: Date
    },

    // Ruta del PDF
    archivo: {
        type: String
    }

});


// =====================================
// ESQUEMA PRINCIPAL DEL PERSONAL
// =====================================

const personalSchema = new mongoose.Schema({

    // -----------------------------
    // DATOS MILITARES
    // -----------------------------

    grado: {
        type: String,
        required: true
    },
        ordenGrado: {
        type: Number,
        default: 999
    },
    arma: {
        type: String,
        required: true
    },
    // -----------------------------
    // INSTITUTO DE EGRESO
    // -----------------------------

    institutoEgreso: {

        type: String,

        default: ''

    },

    // -----------------------------
    // ORDEN DEL INSTITUTO
    // -----------------------------

    ordenInstituto: {

        type: Number,

        default: 999

    },
    anioEgreso: {
    type: Number,
    required: true
},
// -----------------------------
// AÑOS DE SERVICIO
// -----------------------------

aniosServicio: {

    type: Number,

    default: 0

},

// -----------------------------
// ANTIGÜEDAD EN EL GRADO
// -----------------------------

antiguedadGrado: {

    type: Number,

    default: 0

},


// -----------------------------
// CARNETS MILITARES
// -----------------------------

carnetMilitar: {

    type: String,

    default: ''

},

carnetCossmil: {

    type: String,

    default: ''

},
    // -----------------------------
    // IDENTIFICACIÓN
    // -----------------------------

    ci: {
        type: String,
        required: true,
        unique: true
    },

    complemento: {
        type: String
    },

    extension: {
        type: String,
        required: true
    },



    // -----------------------------
    // DATOS PERSONALES
    // -----------------------------

    nombres: {
        type: String,
        required: true
    },

    apellidoPaterno: {
        type: String,
        required: true
    },

    apellidoMaterno: {
        type: String
    },

    fechaNacimiento: {
        type: Date
    },

    lugarNacimiento: {
        type: String
    },

    departamento: {
        type: String
    },

    provincia: {
        type: String
    },

    localidad: {
        type: String
    },

    estadoCivil: {
        type: String
    },

    domicilioActual: {
        type: String
    },

    correoElectronico: {
        type: String
    },

    // -----------------------------
    // FOTOGRAFÍA
    // -----------------------------

    fotografia: {

        type: String,

        default: ''

    },



    // -----------------------------
    // DATOS MÉDICOS
    // -----------------------------

    grupoSanguineo: {
        type: String
    },

    alergias: {
        type: String
    },

    peso: {
        type: Number
    },

    estatura: {
        type: Number
    },



    // -----------------------------
    // DATOS FAMILIARES
    // -----------------------------

    nombrePadre: {
        type: String
    },

    nombreMadre: {
        type: String
    },
    domicilioPadres: {

        type: String,

        default: ''

    },
    nombreEsposa: {
        type: String
    },

    hijos: [hijoSchema],



    // -----------------------------
    // CONTACTOS
    // -----------------------------

    celular: {
        type: String
    },
    telefonoAlterno: {

        type: String,

        default: ''

    },
    referencia1: {
        numero: String,
        parentesco: String
    },

    referencia2: {
        numero: String,
        parentesco: String
    },

    referencia3: {
        numero: String,
        parentesco: String
    },



    // -----------------------------
    // CURSOS
    // -----------------------------

    cursos: [
        {
            type: String
        }
    ],



    // -----------------------------
    // DOCUMENTOS
    // -----------------------------

    hojaVida: {
        type: String
    },

    memorandums: [memorandumSchema],

// -----------------------------
// DESTINO ACTUAL
// -----------------------------

destinoActual: {

    type: String,

    default: ''

},
// -----------------------------
// DESTINOS ANTERIORES
// -----------------------------

destinoGestionAnterior: {

    type: String,

    default: ''

},

destinoHaceDosGestiones: {

    type: String,

    default: ''

},
    // -----------------------------
    // FECHA DE REGISTRO
    // -----------------------------

    fechaRegistro: {

        type: Date,

        default: Date.now

    }

});


// Exportamos el modelo
module.exports = mongoose.model(
    'Personal',
    personalSchema
);