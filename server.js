console.log("🔥 SERVER CARGADO CORRECTAMENTE");

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const verificarConfiguracion = require('./middlewares/configMiddleware');
const app = express();
// ======================
// MIDDLEWARE
// ======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ======================================
// EVITAR CACHE EN PÁGINAS PROTEGIDAS
// ======================================

app.use((req, res, next) => {

    res.setHeader(
        'Cache-Control',
        'no-store, no-cache, must-revalidate, private'
    );

    res.setHeader(
        'Pragma',
        'no-cache'
    );

    res.setHeader(
        'Expires',
        '0'
    );

    next();

});
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));


// ======================
// RUTAS API
// ======================
app.use('/api/auth', require('./routes/auth'));

app.use('/api/vacaciones', require('./routes/vacaciones'));
app.use('/api/destinos', require('./routes/destinosAnteriores'));
app.use('/api/licencias', require('./routes/licencias'));
app.use('/api/bajas-medicas', require('./routes/bajasMedicas'));
app.use('/api/configuracion', require('./routes/configuracion'));
// ======================
// FRONTEND
// ======================
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
// ======================
// VISTAS HTML
// ======================
app.get('/config-ui', async (req, res) => {

    if (!req.session.usuario) return res.redirect('/login');

    const Configuracion = require('./models/Configuracion');

    const config = await Configuracion.findOne();

    res.json(config);

});

app.get('/login', (req, res) => {

    console.log('ENTRÓ A LOGIN');

    res.sendFile(
        path.join(
            __dirname,
            'views',
            'login.html'
        )
    );

});

app.get('/registro',
    
    verificarConfiguracion('registroUsuarios'),

    (req, res) => {

        res.sendFile(
            path.join(
                __dirname,
                'views',
                'registro.html'
            )
        );

    }

);

app.get('/dashboard', (req, res) => {
    if (!req.session.usuario) return res.redirect('/login');
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

//app.get('/personal', (req, res) => {
//    res.sendFile(path.join(__dirname, 'views', 'personal.html'));
//});
// ======================================
// FICHA PERSONAL
// Muestra la vista fichaPersonal.html
// Recibe el ID desde la URL
// Ejemplo:
// /personal/6858abc123
// ======================================

//app.get('/personal/:id', (req, res) => {

//    res.sendFile(

//        path.join(
//            __dirname,
//            'views',
//            'fichaPersonal.html'
//        )

//    );

//});
// ======================================
// EDITAR PERSONAL
// ======================================
//app.get('/personal/:id/editar', (req, res) => {

//    res.sendFile(
//        path.join(
//            __dirname,
//            'views',
//            'editarPersonal.html'
//        )
//    );

//});
app.get('/buscar-personal', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'buscarPersonal.html'));
});

app.get('/destinos-anteriores', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'destinosAnteriores', 'listaDestinos.html'));
});

// ======================================
// EDITAR DESTINO ANTERIOR
// ======================================

app.get('/destinos-anteriores/:id/editar', (req, res) => {

    res.sendFile(

        path.join(
            __dirname,
            'views',
            'destinosAnteriores',
            'editarDestino.html'
        )

    );

});

app.get('/licencias', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'licencias', 'listaLicencias.html'));
});

// ======================================
// REGISTRAR LICENCIA
// Muestra la vista registrarLicencia.html
// ======================================

app.get('/licencias/registrar', (req, res) => {

    res.sendFile(

        path.join(

            __dirname,

            'views',

            'licencias',

            'registrarLicencia.html'

        )

    );

});

// ======================================
// EDITAR LICENCIA
// ======================================

app.get('/licencias/editar/:id', (req, res) => {

    res.sendFile(

        path.join(

            __dirname,

            'views',

            'licencias',

            'editarLicencia.html'

        )

    );

});

app.get('/vacaciones', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'vacaciones', 'listaVacaciones.html'));
});
// ======================================
// PROGRAMAR VACACIÓN
// ======================================

app.get('/vacaciones/programar/:id', (req, res) => {

    res.sendFile(

        path.join(
            __dirname,
            'views',
            'vacaciones',
            'programarVacacion.html'
        )

    );

});

// ======================================
// EDITAR VACACIÓN
// ======================================

app.get('/vacaciones/editar/:id', (req, res) => {

    res.sendFile(

        path.join(
            __dirname,
            'views',
            'vacaciones',
            'editarVacacion.html'
        )

    );

});

// ======================================
// BAJAS MÉDICAS
// ======================================

app.get('/bajas-medicas', (req, res) => {

    res.sendFile(

        path.join(

            __dirname,

            'views',

            'bajasMedicas',

            'listaBajas.html'

        )

    );

});


// ======================================
// REGISTRAR BAJA
// ======================================

app.get('/bajas-medicas/registrar/:id', (req, res) => {

    res.sendFile(

        path.join(

            __dirname,

            'views',

            'bajasMedicas',

            'registrarBaja.html'

        )

    );

});


// ======================================
// EDITAR BAJA
// ======================================

app.get('/bajas-medicas/editar/:id', (req, res) => {

    res.sendFile(

        path.join(

            __dirname,

            'views',

            'bajasMedicas',

            'editarBaja.html'

        )

    );

});

// ======================================
// CONSULTA GENERAL DEL PERSONAL
// ======================================

app.get('/consulta-general', (req, res) => {

    res.sendFile(

        path.join(

            __dirname,

            'views',

            'consultaGeneral',

            'consultaGeneral.html'

        )

    );

});

app.get('/configuracion', (req, res) => {

    // Debe iniciar sesión

    if (!req.session.usuario) {

        return res.redirect('/login');

    }

    // Solo administrador

    if (req.session.usuario.rol !== 'admin') {

        return res.status(403).send(

            'Acceso denegado'

        );

    }

    res.sendFile(

        path.join(

            __dirname,

            'views',

            'configuracion.html'

        )

    );

});
// ======================================
// ADMINISTRAR USUARIOS
// ======================================

app.get('/usuarios', (req, res) => {

    if (!req.session.usuario) {

        return res.redirect('/login');

    }

    // Solo administrador

    if (req.session.usuario.rol !== 'admin') {

        return res.status(403).send('Acceso denegado');

    }

    res.sendFile(

        path.join(

            __dirname,

            'views',

            'usuarios.html'

        )

    );

});
// ======================
// ROOT
// ======================
app.get('/', (req, res) => {
    if (!req.session.usuario) return res.redirect('/login');
    res.redirect('/dashboard');
});

const personalRoutes =
    require('./routes/personal');

app.use('/', personalRoutes);

app.use('/api/personal', personalRoutes);


// ======================================
// USUARIO ACTUAL
// ======================================

app.get('/api/usuario-actual', (req,res)=>{

    if(!req.session.usuario){

        return res.json({

            rol:null

        });

    }


    res.json({

        rol:req.session.usuario.rol

    });

});
// 404 SIEMPRE AL FINAL
app.use((req, res) => {
    res.status(404).json({
        mensaje: 'Ruta no encontrada'
    });
});

const Configuracion = require('./models/Configuracion');
// ======================
// MONGO
// ======================

mongoose.connect(process.env.MONGO_URI, {

    tls: true,

    retryWrites: true

})

.then(async () => {

    console.log('✅ MongoDB conectado');

    // ======================================
    // CREAR CONFIGURACIÓN INICIAL
    // ======================================

    const existeConfiguracion = await Configuracion.findOne();

    if (!existeConfiguracion) {

        await Configuracion.create({

            registroUsuarios: false,

            registroPersonal: true,

            buscarPersonal: true,

            destinos: true,

            vacaciones: true,

            licencias: true,

            bajas: true,

            consultaGeneral: true

        });

        console.log(
            '✅ Configuración inicial creada.'
        );

    }

})

.catch(err => {

    console.log('❌ MongoDB error:', err);

});

// ======================
// SERVER
// ======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor en puerto ${PORT}`);
});