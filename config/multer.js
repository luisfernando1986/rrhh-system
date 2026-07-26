// ======================================
// IMPORTAR MULTER
// ======================================

const multer = require(
    'multer'
);

const path = require(
    'path'
);


// ======================================
// CONFIGURAR ALMACENAMIENTO
// ======================================

const storage = multer.diskStorage({

    // Carpeta donde se guardarán las fotos

    destination: function (

        req,

        file,

        cb

    ) {

        cb(

            null,

            'public/uploads/fotos'

        );

    },

    // Nombre del archivo

    filename: function (

        req,

        file,

        cb

    ) {

        const nombreUnico =

            Date.now() +

            path.extname(
                file.originalname
            );

        cb(

            null,

            nombreUnico

        );

    }

});


// ======================================
// FILTRAR SOLO IMÁGENES
// ======================================

const fileFilter = (

    req,

    file,

    cb

) => {

    const tiposPermitidos =

        /jpg|jpeg|png|webp/;

    const extensionValida =

        tiposPermitidos.test(

            path.extname(
                file.originalname
            ).toLowerCase()

        );

    const mimeValido =

        tiposPermitidos.test(

            file.mimetype
        );

    if (

        extensionValida &&

        mimeValido

    ) {

        return cb(

            null,

            true

        );

    }

    cb(

        new Error(
            'Solo se permiten imágenes'
        )

    );

};


// ======================================
// CONFIGURACIÓN FINAL
// ======================================

const upload = multer({

    storage,

    fileFilter,

    limits: {

        fileSize:

            5 * 1024 * 1024

    }

});


// ======================================
// EXPORTAR
// ======================================

module.exports = upload;