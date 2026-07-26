// ======================================
// IMPORTAR LIBRERÍAS
// ======================================

const PDFDocument = require(
    'pdfkit'
);

const path = require(
    'path'
);




// ======================================
// GENERAR FILIACIÓN
// ======================================

function generarFiliacion(

    persona,

    res

) {

// ==================================
// CREAR DOCUMENTO PDF
// ==================================

const doc = new PDFDocument({

    // Tamaño hoja
    size: 'A4',

    // Márgenes personalizados

    margins: {

        // Superior 2 cm
        top: 57,

        // Inferior 2 cm
        bottom: 57,

        // Izquierda 3 cm
        left: 85,

        // Derecha 2 cm
        right: 57

    }

});

    // ==================================
    // REGISTRAR FUENTES
    // ==================================

    doc.registerFont(

        'Arial',

        path.join(

            __dirname,

            '../fonts/ARIAL.TTF'

        )

    );

    doc.registerFont(

        'ArialBold',

        path.join(

            __dirname,

            '../fonts/ARIALBD.TTF'

        )

    );

    // ==================================
    // CONFIGURAR RESPUESTA
    // ==================================

    const nombreArchivo =

        `FILIACION_${persona.ci}.pdf`;

    res.setHeader(

        'Content-Type',

        'application/pdf'

    );

    res.setHeader(

        'Content-Disposition',

        `inline; filename="${nombreArchivo}"`

    );

    // ==================================
    // ENVIAR PDF
    // ==================================

    doc.pipe(res);

    // ==================================
    // FECHA ACTUAL
    // ==================================

    const fechaActual =

        new Date().toLocaleDateString(
            'es-BO'
        );
// ==================================
// RUTA DE LA FOTOGRAFÍA
// ==================================

const rutaFoto = path.join(

    __dirname,

    '../public/uploads/fotos',

    persona.fotografia || ''

);

    // ==================================
    // MEMBRETE
    // ==================================

    doc

        .font(
            'ArialBold'
        )

        .fontSize(10)

        .text(

            'ESTADO PLURINACIONAL DE',

            150,

            50,

            {

                align: 'center'

            }

        );

    doc.text(

        'BOLIVIA',

        {

            align: 'center',

            underline: true

        }

    );

    doc.text(

        'EJÉRCITO DE BOLIVIA',

        {

            align: 'center'

        }

    );

    doc.text(

        'REGISTRO DE PERSONAL',

        {

            align: 'center'

        }

    );

    // ==================================
    // FECHA
    // ==================================

    doc.moveDown(0.3);

    doc

        .font(
            'Arial'
        )

        .fontSize(10)

        .text(

            `Fecha de impresión: ${fechaActual}`,

            {

                align: 'right'

            }

        );

    doc.moveDown(0.3);

    // ==================================
    // TÍTULO
    // ==================================

    doc

        .font(
            'ArialBold'
        )

        .fontSize(16)

        .text(

            'FILIACIÓN PERSONAL',

            {

                align: 'center'

            }

        );

    doc.moveDown(2);

// ==================================
// FOTOGRAFÍA
// ==================================

if (persona.fotografia) {

    const rutaFoto = path.join(

        __dirname,

        '../public/uploads/fotos/',

        persona.fotografia

    );

    doc.rect(

        430,

        150,

        100,

        120

    ).stroke();

    doc.image(

        rutaFoto,

        430,

        150,

        {

            fit: [50, 120],

            align: 'center',

            valign: 'center'

        }

    );

}
    // ==================================
    // DATOS PERSONALES
    // ==================================

    doc

        .font(
            'ArialBold'
        )

        .fontSize(10)

        .text(
            'DATOS PERSONALES'
        );

    doc.moveDown(0.5);

    doc

        .font(
            'Arial'
        )

        .fontSize(10);

    doc.text(
        `Grado: ${persona.grado || ''}`
    );

    doc.text(
        `Arma: ${persona.arma || ''}`
    );

    doc.text(
        `Nombres: ${persona.nombres || ''}`
    );

    doc.text(
        `Apellido Paterno: ${persona.apellidoPaterno || ''}`
    );

    doc.text(
        `Apellido Materno: ${persona.apellidoMaterno || ''}`
    );

    doc.text(
        `CI: ${persona.ci || ''}`
    );

    doc.text(
        `Celular: ${persona.celular || ''}`
    );

    doc.text(
        `Correo: ${persona.correoElectronico || ''}`
    );

    doc.moveDown(0.3);

    // ==================================
    // DATOS FAMILIARES
    // ==================================

    doc

        .font(
            'ArialBold'
        )

        .fontSize(10)

        .text(
            'DATOS FAMILIARES'
        );

    doc.moveDown(0.5);

    doc

        .font(
            'Arial'
        )

        .fontSize(10);

    doc.text(
        `Padre: ${persona.nombrePadre || ''}`
    );

    doc.text(
        `Madre: ${persona.nombreMadre || ''}`
    );

    doc.text(
        `Esposa: ${persona.nombreEsposa || ''}`
    );

    doc.text(
        `Estado Civil: ${persona.estadoCivil || ''}`
    );

    doc.moveDown(0.3);

    // ==================================
    // REFERENCIAS
    // ==================================

    doc

        .font(
            'ArialBold'
        )

        .fontSize(10)

        .text(
            'REFERENCIAS DE EMERGENCIA'
        );

    doc.moveDown(0.5);

    doc

        .font(
            'Arial'
        )

        .fontSize(10);

    doc.text(

        `1.- ${persona.referencia1?.numero || ''} (${persona.referencia1?.parentesco || ''})`

    );

    doc.text(

        `2.- ${persona.referencia2?.numero || ''} (${persona.referencia2?.parentesco || ''})`

    );

    doc.text(

        `3.- ${persona.referencia3?.numero || ''} (${persona.referencia3?.parentesco || ''})`

    );

    doc.moveDown(2);

    // ==================================
    // FIRMA
    // ==================================

    doc.text(

        '________________________________',

        {

            align: 'center'

        }

    );

    doc.text(

        'FIRMA DEL TITULAR',

        {

            align: 'center'

        }

    );

    // ==================================
    // FINALIZAR PDF
    // ==================================

    doc.end();

}


// ======================================
// EXPORTAR
// ======================================

module.exports = generarFiliacion;