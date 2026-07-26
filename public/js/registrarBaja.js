// ======================================
// OBTENER ID DEL PERSONAL
// ======================================

const id =

    window.location.pathname
        .split('/')
        .pop();


// ======================================
// CARGAR DATOS DEL PERSONAL
// ======================================

async function cargarPersonal() {

    try {

        const respuesta =

            await fetch(

                `/api/bajas-medicas/personal/${id}`

            );

        const persona =

            await respuesta.json();

        document.getElementById(

            'datosPersonal'

        ).innerHTML = `

            <h2>

                ${persona.grado || ''}

                ${persona.arma || ''}

            </h2>

            <h3>

                ${persona.apellidoPaterno || ''}

                ${persona.apellidoMaterno || ''}

                ${persona.nombres || ''}

            </h3>

            <p>

                CI:
                ${persona.ci || ''}

            </p>

        `;

    }

    catch(error){

        console.log(error);

    }

}

cargarPersonal();


// ======================================
// CALCULAR DÍAS
// ======================================

function calcularDias(){

    const inicio =

        document.getElementById(
            'fechaInicio'
        ).value;

    const fin =

        document.getElementById(
            'fechaFin'
        ).value;

    if(!inicio || !fin){

        return;

    }

    const fechaInicio =

        new Date(inicio);

    const fechaFin =

        new Date(fin);

    const diferencia =

        fechaFin - fechaInicio;

    const dias =

        Math.floor(

            diferencia /

            (1000 * 60 * 60 * 24)

        ) + 1;

    document.getElementById(

        'dias'

    ).value = dias;

    // ==========================
    // ALERTA MÁS DE 30 DÍAS
    // ==========================

    if(dias > 30){

        alert(

            'ATENCIÓN\n\n' +

            'La baja médica supera los 30 días.\n\n' +

            'Corresponde evaluación por Junta Médica para Disponibilidad Letra D.'

        );

    }

}


// ======================================
// EVENTOS
// ======================================

document.getElementById(

    'fechaInicio'

).addEventListener(

    'change',

    calcularDias

);

document.getElementById(

    'fechaFin'

).addEventListener(

    'change',

    calcularDias

);


// ======================================
// GUARDAR
// ======================================

document.getElementById(

    'formBaja'

).addEventListener(

    'submit',

    async function(e){

        e.preventDefault();

        try{

            const datos = {

                personalId: id,

                entidadMedica:

                    document.getElementById(
                        'entidadMedica'
                    ).value,

                medico:

                    document.getElementById(
                        'medico'
                    ).value,

                especialidad:

                    document.getElementById(
                        'especialidad'
                    ).value,

                numeroCertificado:

                    document.getElementById(
                        'numeroCertificado'
                    ).value,

                diagnostico:

                    document.getElementById(
                        'diagnostico'
                    ).value,

                fechaInicio:

                    document.getElementById(
                        'fechaInicio'
                    ).value,

                fechaFin:

                    document.getElementById(
                        'fechaFin'
                    ).value,

                dias:

                    parseInt(

                        document.getElementById(
                            'dias'
                        ).value

                    ),

                observacion:

                    document.getElementById(
                        'observacion'
                    ).value

            };

            const respuesta =

                await fetch(

                    '/api/bajas-medicas',

                    {

                        method:'POST',

                        headers:{

                            'Content-Type':

                                'application/json'

                        },

                        body:

                            JSON.stringify(datos)

                    }

                );

            const resultado =

                await respuesta.json();

            alert(

                resultado.mensaje

            );

            // ======================================
            // ACTUALIZAR RESUMEN E HISTORIAL
            // ======================================

            await cargarResumen();

            await cargarHistorial();

            // ======================================
            // LIMPIAR FORMULARIO
            // ======================================

            document.getElementById(

                'formBaja'

            ).reset();

            document.getElementById(

                'dias'

            ).value = '';

        }

        catch(error){

            console.log(error);

        }

    }

);

// ======================================
// CARGAR RESUMEN
// ======================================

async function cargarResumen(){

    const respuesta =

        await fetch(

            `/api/bajas-medicas/personal/${id}/resumen`

        );

    const resumen =

        await respuesta.json();

    document.getElementById(

        'resumenMedico'

    ).innerHTML = `

        <div class="cardResumen">

            <h3>

                Bajas Registradas

            </h3>

            <h2>

                ${resumen.cantidad}

            </h2>

        </div>

        <div class="cardResumen">

            <h3>

                Días Acumulados

            </h3>

            <h2>

                ${resumen.dias}

            </h2>

        </div>

        <div class="cardResumen">

            <h3>

                Estado

            </h3>

            <h2>

                ${resumen.estado}

            </h2>

        </div>

    `;

}

// ======================================
// HISTORIAL DE BAJAS MÉDICAS
// Muestra cada registro como una Card
// ======================================

async function cargarHistorial() {

    try {

        const respuesta = await fetch(

            `/api/bajas-medicas/personal/${id}/registros`

        );

        const registros = await respuesta.json();

        const contenedor = document.getElementById(

            'historialBajas'

        );

        contenedor.innerHTML = '';

        registros.forEach((registro, indice) => {

            // ==========================
            // CALCULAR ESTADO
            // ==========================

            const hoy = new Date();

            const inicio = new Date(registro.fechaInicio);

            const fin = new Date(registro.fechaFin);

            let estado = 'FINALIZADA';

            let claseEstado = 'estadoNormal';

            if (registro.dias > 30) {

                estado = 'REQUIERE JUNTA MÉDICA';

                claseEstado = 'estadoJunta';

            }

            else if (hoy < inicio) {

                estado = 'PROGRAMADA';

                claseEstado = 'estadoProgramada';

            }

            else if (hoy <= fin) {

                estado = 'EN CURSO';

                claseEstado = 'estadoCurso';

            }

            // ==========================
            // CREAR CARD
            // ==========================

            const card = document.createElement('div');

            card.className = 'cardBaja';

            card.innerHTML = `

                <h3>

                    BAJA MÉDICA

                </h3>

                <h4>

                    ${registro.entidadMedica}

                </h4>

                <div class="estado ${claseEstado}">

                    ${estado}

                </div>

                <p>

                    <strong>Médico:</strong>

                    ${registro.medico}

                </p>

                <p>

                    <strong>Especialidad:</strong>

                    ${registro.especialidad}

                </p>

                <p>

                    <strong>Nº Certificado:</strong>

                    ${registro.numeroCertificado}

                </p>

                <p>

                    <strong>Diagnóstico:</strong>

                    ${registro.diagnostico}

                </p>

                <p>

                    <strong>Fecha Inicio:</strong>

                    ${registro.fechaInicio.substring(0,10)}

                </p>

                <p>

                    <strong>Fecha Fin:</strong>

                    ${registro.fechaFin.substring(0,10)}

                </p>

                <p>

                    <strong>Días:</strong>

                    ${registro.dias}

                </p>

                <p>

                    <strong>Observaciones:</strong>

                    ${registro.observacion || '-'}

                </p>

                <div class="cardAcciones">

                    <button

                        onclick="window.location.href='/bajas-medicas/editar/${registro._id}'">

                        Editar

                    </button>

                    <button

                        onclick="eliminarBaja('${registro._id}')">

                        Eliminar

                    </button>

                </div>

            `;

            contenedor.appendChild(card);

        });

    }

    catch (error) {

        console.log(error);

    }

}


// ======================================
// EDITAR BAJA
// ======================================

function editarBaja(idRegistro){

    window.location.href =

        `/bajas-medicas/editar/${idRegistro}`;

}

cargarResumen();

cargarHistorial();





// ======================================
// ELIMINAR
// ======================================

async function eliminarBaja(idRegistro){
    const confirmar = confirm(

        '¿Eliminar esta baja médica?'

    );

    if(!confirmar){

        return;

    }

    await fetch(

        `/api/bajas-medicas/${idRegistro}`,

        {

            method:'DELETE'

        }

    );

    cargarResumen();

    cargarHistorial();

}