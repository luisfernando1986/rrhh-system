// ======================================
// IMPORTS
// ======================================
const express = require('express');
const router = express.Router();
console.log('✅ routes/personal.js cargado');
const path = require('path');

const Personal = require('../models/Personal');
const upload = require('../config/multer');

// ======================================
// VISTA PRINCIPAL
// ======================================
router.get('/personal', (req, res) => {
    res.sendFile(
        path.join(__dirname, '../views/personal.html')
    );
});

// ======================================
// PASO 1
// ======================================
router.post('/personal', (req, res) => {

    try {

        req.session.personal = {
            grado: req.body.grado,
            arma: req.body.arma,
            nombres: req.body.nombres,
            apellidoPaterno: req.body.apellidoPaterno,
            apellidoMaterno: req.body.apellidoMaterno,
            ci: req.body.ci,
            complemento: req.body.complemento,
            extension: req.body.extension
        };

        res.redirect('/personal/paso2');

    } catch (error) {
        console.log(error);
        res.send('Error');
    }

});

// ======================================
// PASO 2
// ======================================
router.get('/personal/paso2', (req, res) => {
    res.sendFile(
        path.join(__dirname, '../views/identificacion.html')
    );
});

router.post('/personal/paso2', (req, res) => {

    try {

        if (!req.session.personal) {
            return res.redirect('/personal');
        }

        req.session.personal.carnetMilitar = req.body.carnetMilitar;
        req.session.personal.carnetCossmil = req.body.carnetCossmil;
        req.session.personal.anioEgreso = req.body.anioEgreso;
        req.session.personal.antiguedadGrado = req.body.antiguedadGrado;
        req.session.personal.institutoEgreso = req.body.institutoEgreso;
        req.session.personal.destinoActual = req.body.destinoActual;

        res.redirect('/personal/paso3');

    } catch (error) {
        console.log(error);
        res.send('Error Paso 2');
    }

});

// ======================================
// PASO 3
// ======================================
router.get('/personal/paso3', (req, res) => {
    res.sendFile(
        path.join(__dirname, '../views/datosPersonales.html')
    );
});

router.post('/personal/paso3', upload.single('fotografia'), (req, res) => {

    try {

        if (!req.session.personal) {
            return res.redirect('/personal');
        }

        req.session.personal.fechaNacimiento = req.body.fechaNacimiento;
        req.session.personal.lugarNacimiento = req.body.lugarNacimiento;
        req.session.personal.departamento = req.body.departamento;
        req.session.personal.provincia = req.body.provincia;
        req.session.personal.localidad = req.body.localidad;

        if (req.file) {
            req.session.personal.fotografia = req.file.filename;
        }

        res.redirect('/personal/paso4');

    } catch (error) {
        console.log(error);
        res.send('Error Paso 3');
    }

});

// ======================================
// PASO 4
// ======================================
router.get('/personal/paso4', (req, res) => {
    res.sendFile(
        path.join(__dirname, '../views/familiaContacto.html')
    );
});

router.post('/personal/paso4', (req, res) => {

    try {

        if (!req.session.personal) {
            return res.redirect('/personal');
        }

        req.session.personal.estadoCivil = req.body.estadoCivil;
        req.session.personal.domicilioActual = req.body.domicilioActual;
        req.session.personal.nombrePadre = req.body.nombrePadre;
        req.session.personal.nombreMadre = req.body.nombreMadre;
        req.session.personal.nombreEsposa = req.body.nombreEsposa;
        req.session.personal.domicilioPadres = req.body.domicilioPadres;
        req.session.personal.celular = req.body.celular;
        req.session.personal.telefonoAlterno = req.body.telefonoAlterno;
        req.session.personal.correoElectronico = req.body.correoElectronico;

        req.session.personal.referencia1 = {
            numero: req.body.ref1_numero,
            parentesco: req.body.ref1_parentesco
        };

        req.session.personal.referencia2 = {
            numero: req.body.ref2_numero,
            parentesco: req.body.ref2_parentesco
        };

        req.session.personal.referencia3 = {
            numero: req.body.ref3_numero,
            parentesco: req.body.ref3_parentesco
        };

        const hijos = [];
        const cantidad = parseInt(req.body.numeroHijos) || 0;

        for (let i = 1; i <= cantidad; i++) {
            hijos.push({
                nombre: req.body[`hijoNombre${i}`],
                fechaNacimiento: req.body[`hijoFecha${i}`],
                sexo: req.body[`hijoSexo${i}`]
            });
        }

        req.session.personal.hijos = hijos;

        res.redirect('/personal/paso5');

    } catch (error) {
        console.log(error);
        res.send('Error Paso 4');
    }

});

// ======================================
// PASO 5
// ======================================
router.get('/personal/paso5', (req, res) => {
    res.sendFile(
        path.join(__dirname, '../views/informacionMedica.html')
    );
});

router.post('/personal/paso5', (req, res) => {

    try {

        if (!req.session.personal) {
            return res.redirect('/personal');
        }

        req.session.personal.grupoSanguineo = req.body.grupoSanguineo;
        req.session.personal.alergias = req.body.alergias;
        req.session.personal.peso = req.body.peso;
        req.session.personal.estatura = req.body.estatura;

        res.redirect('/personal/paso6');

    } catch (error) {
        console.log(error);
        res.send('Error Paso 5');
    }

});

// ======================================
// PASO 6
// ======================================
router.get('/personal/paso6', (req, res) => {
    res.sendFile(
        path.join(__dirname, '../views/cursosDocumentacion.html')
    );
});

// ======================================
// FUNCIONES ORDEN
// ======================================
function obtenerOrdenGrado(grado) {

    const grados = {
        'GRAL.': 1,
        'CNL.': 2,
        'TCNL.': 3,
        'MY.': 4,
        'CAP.': 5,
        'TTE.': 6,
        'SBTTE.': 7,
        'SOF. MSTRE': 8,
        'SOF. MY.': 9,
        'SOF. 1RO.': 10,
        'SOF. 2DO.': 11,
        'SOF. INCL.': 12,
        'SGTO. 1RO.': 13,
        'SGTO. 2DO.': 14,
        'SGTO. INCL.': 15,
        'PROF.': 16,
        'TEC.': 17,
        'ADM.': 18,
        'APAD.': 19,
    };

    return grados[grado] || 999;
}

function obtenerOrdenInstituto(inst) {
    return inst === 'EMME.' ? 999 : 1;
}

// ======================================
// FINALIZAR REGISTRO
// ======================================
router.post('/personal/finalizar', async (req, res) => {

    try {

        if (!req.session.personal) {
            return res.redirect('/personal');
        }

        req.session.personal.cursos = req.body.cursos || [];

        const existe = await Personal.findOne({
            ci: req.session.personal.ci
        });

        if (existe) {
            return res.send('Ya existe CI');
        }

        req.session.personal.ordenGrado =
            obtenerOrdenGrado(req.session.personal.grado);

        req.session.personal.ordenInstituto =
            obtenerOrdenInstituto(req.session.personal.institutoEgreso);

        const anioActual = new Date().getFullYear();

        req.session.personal.aniosServicio =
            anioActual - Number(req.session.personal.anioEgreso) - 1;


        req.session.personal.antiguedadActual =
            req.session.personal.aniosServicio;

        const nuevo = new Personal(req.session.personal);

            await nuevo.save();


            // ======================================
            // VINCULAR EL USUARIO CON SU PERSONAL
            // ======================================

            if (

                req.session.usuario &&
                req.session.usuario.rol !== 'admin'

            ) {

                const Usuario = require('../models/Usuario');

                await Usuario.findByIdAndUpdate(

                    req.session.usuario.id,

                    {

                        personalId: nuevo._id

                    }

                );

            }

            delete req.session.personal;

            res.redirect('/dashboard');

                } catch (error) {
                    console.log(error);
                    res.send('Error');
                }

            });

// ======================================
// VISTA BUSCAR
// ======================================
router.get('/buscar-personal', (req, res) => {
    res.sendFile(
        path.join(__dirname, '../views/buscarPersonal.html')
    );
});

// ======================================
// API BUSCAR PERSONAL
// URL FINAL:
// GET /api/personal/buscar
// ======================================
router.get('/buscar', async (req, res) => {

    try {

        const texto = req.query.texto || '';

        let filtro = {

            $or: [

                { ci: { $regex: texto, $options: 'i' } },

                { nombres: { $regex: texto, $options: 'i' } },

                { apellidoPaterno: { $regex: texto, $options: 'i' } },

                { apellidoMaterno: { $regex: texto, $options: 'i' } }

            ]

        };

        // ADMINISTRADOR VE TODO

        if (req.session.usuario.rol === 'admin') {

            const resultados = await Personal.find(filtro);

            return res.json(resultados);

        }

        // USUARIO SOLO SU FICHA

        filtro._id = req.session.usuario.personalId;

        const resultados = await Personal.find(filtro);

        res.json(resultados);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            mensaje: 'Error'

        });

    }

});

// ======================================
// API LISTAR PERSONAL
// URL FINAL:
// GET /api/personal
// ======================================
router.get('/', async (req, res) => {

    try {

        // ==========================
        // ADMINISTRADOR
        // ==========================

        if (req.session.usuario.rol === 'admin') {

            const data = await Personal.find();

            return res.json(data);

        }

        // ==========================
        // USUARIO
        // ==========================

        const Usuario = require('../models/Usuario');

        const usuario = await Usuario.findById(

            req.session.usuario.id

        );

        if (!usuario.personalId) {

            return res.json([]);

        }

        const persona = await Personal.findById(

            usuario.personalId

        );

        if (!persona) {

            return res.json([]);

        }

        res.json([persona]);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            mensaje:'Error'

        });

    }

});



router.get('/personal/:id', (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            '../views',
            'fichaPersonal.html'
        )
    );

});

router.get('/personal/:id/editar', (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            '../views',
            'editarPersonal.html'
        )
    );

});

// ======================================
// CONSULTA GENERAL DEL PERSONAL
// ======================================
router.get('/consulta-general', async (req, res) => {

    try {


        if (!req.session.usuario) {

            return res.status(401).json({

                mensaje:'Debe iniciar sesión'

            });

        }



        // ============================
        // ADMINISTRADOR
        // ============================

        if (req.session.usuario.rol === 'admin') {


            const personal = await Personal.find()

                .sort({

                    ordenGrado:1,

                    anioEgreso:1,

                    ordenInstituto:1

                });


            return res.json(personal);


        }



        // ============================
        // USUARIO NORMAL
        // ============================

        const Usuario = require('../models/Usuario');


        const usuario = await Usuario.findById(

            req.session.usuario.id

        );


        if (!usuario.personalId) {


            return res.json([]);


        }



        const persona = await Personal.findById(

            usuario.personalId

        );


        return res.json(

            persona ? [persona] : []

        );



    }

    catch(error){


        console.log(error);


        res.status(500).json({

            mensaje:'Error al obtener personal'

        });


    }

});
// ======================================
// FICHA INTEGRAL DEL PERSONAL
// ======================================

router.get('/ficha/:id', (req, res) => {

    res.sendFile(

        path.join(

            __dirname,

            '../views/fichaIntegral.html'

        )

    );

});

// ======================================
// IGNORAR FAVICON
// ======================================

router.get('/favicon.ico', (req,res)=>{

    res.status(204).end();

});
// ======================================
// API OBTENER PERSONAL POR ID
// URL FINAL:
// GET /api/personal/:id
// ======================================
router.get('/:id', async (req, res) => {

    if (!req.session.usuario) {

        return res.status(401).json({

            mensaje: 'Debe iniciar sesión'

        });

    }

    try {

        // ======================================
        // ADMINISTRADOR
        // ======================================

        if (req.session.usuario.rol === 'admin') {

            const persona = await Personal.findById(req.params.id);

            return res.json(persona);

        }

        // ======================================
        // USUARIO
        // ======================================

        const Usuario = require('../models/Usuario');

        const usuario = await Usuario.findById(

            req.session.usuario.id

        );

        if (!usuario.personalId) {

            return res.status(403).json({

                mensaje: 'Acceso denegado'

            });

        }

        // Verificar que solo consulte su propia ficha

        if (usuario.personalId.toString() !== req.params.id) {

            return res.status(403).json({

                mensaje: 'Acceso denegado'

            });

        }

        const persona = await Personal.findById(

            usuario.personalId

        );

        res.json(persona);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            mensaje: 'Error'

        });

    }

});

// ======================================
// EDITAR VISTA
// ======================================
router.get('/:id/editar', (req, res) => {
    res.sendFile(
        path.join(__dirname, '../views/editarPersonal.html')
    );
});

// ======================================
// API ACTUALIZAR PERSONAL
// URL FINAL:
// PUT /api/personal/:id
// ======================================
router.put('/:id', async (req, res) => {

    try {

        // =====================================
        // OBTENER USUARIO
        // =====================================

        const Usuario = require('../models/Usuario');

        const usuario = await Usuario.findById(

            req.session.usuario.id

        );

        if (!usuario) {

            return res.status(401).json({

                mensaje: 'Usuario no encontrado'

            });

        }

        // =====================================
        // ADMINISTRADOR
        // =====================================

        if (usuario.rol === 'admin') {

            const ordenGrado =
                obtenerOrdenGrado(req.body.grado);

            const ordenInstituto =
                obtenerOrdenInstituto(req.body.institutoEgreso);

            await Personal.findByIdAndUpdate(

                req.params.id,

                {

                    ...req.body,

                    ordenGrado,

                    ordenInstituto

                }

            );

            return res.json({

                mensaje: 'Actualizado'

            });

        }

        // =====================================
        // ¿PUEDE EDITAR?
        // =====================================

        // De momento todo usuario puede editar su propia ficha.
        // Más adelante implementaremos permisos por módulo.

        // =====================================
        // ¿ES SU FICHA?
        // =====================================

        if (

            usuario.personalId.toString()

            !==

            req.params.id

        ) {

            return res.status(403).json({

                mensaje: 'No puede editar otra ficha.'

            });

        }

        const ordenGrado =
            obtenerOrdenGrado(req.body.grado);

        const ordenInstituto =
            obtenerOrdenInstituto(req.body.institutoEgreso);

        await Personal.findByIdAndUpdate(

            usuario.personalId,

            {

                ...req.body,

                ordenGrado,

                ordenInstituto

            }

        );

        res.json({

            mensaje: 'Actualizado'

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            mensaje: 'Error'

        });

    }

});


// ======================================
module.exports = router;