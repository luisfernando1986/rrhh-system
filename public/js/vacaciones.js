let listaPersonal = [];
let listaVacaciones = [];
// ======================================
// TABLA
// ======================================

const tbody = document.querySelector(
    '#tablaVacaciones tbody'
);

// ======================================
// CALCULAR DÍAS DE VACACIÓN
// ======================================

function calcularDiasVacacion(
    aniosServicio
) {

    if (aniosServicio < 1) {

        return 0;

    }

    if (aniosServicio < 5) {

        return 15;

    }

    if (aniosServicio < 10) {

        return 20;

    }

    if (aniosServicio < 20) {

        return 25;

    }

    return 30;

}
// ======================================
// RENDERIZAR TABLA
// ======================================

function renderizarTabla(

    personal

){

    tbody.innerHTML = '';

    personal.forEach(persona => {

        const diasVacacion =

            calcularDiasVacacion(

                persona.aniosServicio || 0

            );

        const fila =

            document.createElement('tr');

        fila.innerHTML = `

        <td>
            ${persona.grado || ''}
        </td>

        <td>
            ${persona.arma || ''}
        </td>

        <td>
            ${persona.apellidoPaterno || ''}
            ${persona.apellidoMaterno || ''}
            ${persona.nombres || ''}
        </td>

        <td>
            ${new Date().getFullYear()}
        </td>

        <td>
            ${persona.aniosServicio || 0}
        </td>

        <td>
            ${diasVacacion}
        </td>

        <td>
            ${persona.diasProgramados || 0}
        </td>

        <td>
            ${

                diasVacacion -

                (persona.diasProgramados || 0)

            }
        </td>

        <td>

            <a
                href="/vacaciones/programar/${persona._id}"
                class="btn btnEditar">

                Programar

            </a>

        </td>

        `;

        tbody.appendChild(fila);

    });

}
// ======================================
// CARGAR PERSONAL
// ======================================

async function cargarPersonal() {

    try {

        const respuesta = await fetch(
            '/api/vacaciones'
        );

        const personal =
            await respuesta.json();

        listaPersonal = personal;

        renderizarTabla(
            personal
        );

    }

    catch (error) {

        console.log(error);

    }

}

// ======================================
// FILTRAR
// ======================================

function aplicarFiltros(){

    const nombre =

        document
        .getElementById(
            'buscarNombre'
        )
        .value
        .toLowerCase();

    const grado =

        document
        .getElementById(
            'buscarGrado'
        )
        .value
        .toLowerCase();

    const arma =

        document
        .getElementById(
            'buscarArma'
        )
        .value
        .toLowerCase();

    const filtrados =

        listaPersonal.filter(

            persona => {

                const nombreCompleto = `

                    ${persona.apellidoPaterno || ''}

                    ${persona.apellidoMaterno || ''}

                    ${persona.nombres || ''}

                `
                .toLowerCase();

                return (

                    nombreCompleto.includes(nombre)

                    &&

                    (persona.grado || '')
                    .toLowerCase()
                    .includes(grado)

                    &&

                    (persona.arma || '')
                    .toLowerCase()
                    .includes(arma)

                );

            }

        );

    renderizarTabla(

        filtrados

    );

}

document
.getElementById(
    'buscarNombre'
)
.addEventListener(
    'input',
    aplicarFiltros
);

document
.getElementById(
    'buscarGrado'
)
.addEventListener(
    'input',
    aplicarFiltros
);

document
.getElementById(
    'buscarArma'
)
.addEventListener(
    'input',
    aplicarFiltros
);




async function cargarVacaciones(){

    try{

        const respuesta = await fetch(
            '/api/vacaciones/listado'
        );

        listaVacaciones = await respuesta.json();

    }

    catch(error){

        console.log(error);

    }

}
// ======================================
// CARGAR ESTADISTICAS VACACIONES
// ======================================

async function cargarEstadisticasVacaciones(){

    try{

        const respuesta = await fetch(
            '/api/vacaciones/estadisticas'
        );


        const datos = await respuesta.json();


        document.getElementById(
            'totalVacaciones'
        ).textContent = datos.total || 0;


        document.getElementById(
            'vacacionesActivas'
        ).textContent = datos.activas || 0;


        document.getElementById(
            'vacacionesVencidas'
        ).textContent = datos.vencidas || 0;


        document.getElementById(
            'vacacionesProgramadas'
        ).textContent = datos.programadas || 0;



        const tipos =
        document.getElementById(
            'vacacionesPorTipo'
        );


        tipos.innerHTML = '';



        if(datos.porTipo){

            Object.keys(datos.porTipo)
            .forEach(tipo=>{


                tipos.innerHTML += `

                    <div>
                        ${tipo} :
                        ${datos.porTipo[tipo]}
                    </div>

                `;


            });

        }


    }

    catch(error){

        console.log(
            'Error estadísticas',
            error
        );

    }

}


function filtrarDashboard(tipo){

    if(tipo === 'TOTAL'){
        renderizarTabla(listaPersonal);
        return;
    }

    const hoy = new Date();

    const ids = [];

    listaVacaciones.forEach(v => {

        const inicio = new Date(v.fechaInicio);
        const fin = new Date(v.fechaFin);

        if(
            tipo === 'ACTIVA' &&
            inicio <= hoy &&
            fin >= hoy
        ){
            ids.push(String(v.personalId._id));
        }

        if(
            tipo === 'FINALIZADA' &&
            fin < hoy
        ){
            ids.push(String(v.personalId._id));
        }

        if(
            tipo === 'PROGRAMADA' &&
            inicio > hoy
        ){
            ids.push(String(v.personalId._id));
        }

    });

    const filtrados = listaPersonal.filter(p =>
        ids.includes(String(p._id))
    );

    renderizarTabla(filtrados);

}

cargarPersonal();
cargarVacaciones();
cargarEstadisticasVacaciones();