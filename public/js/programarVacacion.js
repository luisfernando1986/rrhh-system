// ======================================
// OBTENER ID
// ======================================

const id =

    window.location.pathname
        .split('/')
        .pop();

// ======================================
// CALCULAR DÍAS VACACIÓN
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
// CARGAR DATOS
// ======================================

async function cargarPersonal() {

    try {

        const respuesta =

            await fetch(

                `/api/vacaciones/personal/${id}`

            );

        const persona =

            await respuesta.json();

        const aniosServicio = persona.aniosServicio || 0;

        const diasVacacion =

            calcularDiasVacacion(
                aniosServicio
            );

        // ==========================
        // DATOS DEL MILITAR
        // ==========================

        document.getElementById(

                'datosPersonal'

            ).innerHTML = `

                <div class="cardResumen">

                    <h3>

                        Grado

                    </h3>

                    <p>

                        ${persona.grado || ''}

                    </p>

                </div>

                <div class="cardResumen">

                    <h3>

                        Arma

                    </h3>

                    <p>

                        ${persona.arma || ''}

                    </p>

                </div>

                <div class="cardResumen">

                    <h3>

                        Militar

                    </h3>

                    <p>

                        ${persona.apellidoPaterno || ''}

                        ${persona.apellidoMaterno || ''}

                        ${persona.nombres || ''}

                    </p>

                </div>

            `;

        // ==========================
        // RESUMEN
        // ==========================

        document.getElementById(

            'resumenVacacion'

        ).innerHTML = `

            <p>

                Años de Servicio:
                    ${aniosServicio}

            </p>

            <p>

                Días que le corresponden:
                ${diasVacacion}

            </p>

            <p>

                Días utilizados:
                0

            </p>

            <p>

                Días disponibles:
                ${diasVacacion}

            </p>

        `;

    }

    catch (error) {

        console.log(error);

    }

}

// ======================================
// CALCULAR DÍAS
// ======================================
// ======================================
// CALCULAR DÍAS HÁBILES
// ======================================

function calcularDiasHabiles(

    inicio,

    fin

) {

    let dias = 0;

    let fecha = new Date(
        inicio + 'T12:00:00'
    );

    const fechaFin = new Date(
        fin + 'T12:00:00'
    );


    while (fecha <= fechaFin) {

        const diaSemana = fecha.getDay();


        if (
            diaSemana !== 0 &&
            diaSemana !== 6
        ) {

            dias++;

        }


        fecha.setDate(
            fecha.getDate() + 1
        );

    }


    return dias;

}

// ======================================
// GUARDAR VACACIÓN
// ======================================

document.getElementById(

    'formVacacion'

).addEventListener(

    'submit',

    async function(e) {

        e.preventDefault();

        try {

            const fechaInicio =

                document.getElementById(
                    'fechaInicio'
                ).value;

            const fechaFin =

                document.getElementById(
                    'fechaFin'
                ).value;


                // ======================================
                // VALIDAR FECHAS
                // ======================================

                if (!fechaInicio || !fechaFin) {

                    alert(
                        'Debe seleccionar la fecha de inicio y fin.'
                    );

                    return;

                }

                if (fechaFin < fechaInicio) {

                    alert(
                        'La fecha fin no puede ser menor que la fecha inicio.'
                    );

                    return;

                }
            const datos = {

                personalId:

                    id,

                tipo:

                    document.getElementById(
                        'tipo'
                    ).value,

                fechaInicio,

                fechaFin,

                dias:

                    calcularDiasHabiles(
                        fechaInicio,
                        fechaFin
                    ),

                observacion:

                    document.getElementById(
                        'observacion'
                    ).value

            };

            const respuesta =

                await fetch(

                    '/api/vacaciones',

                    {

                        method: 'POST',

                        headers: {

                            'Content-Type':

                                'application/json'

                        },

                        body:

                            JSON.stringify(
                                datos
                            )

                    }

                );

            const resultado =

                await respuesta.json();

            alert(

                resultado.mensaje

            );

            // ======================================
            // LIMPIAR FORMULARIO
            // ======================================

            document.getElementById(
                'formVacacion'
            ).reset();

            // ======================================
            // ACTUALIZAR INFORMACIÓN
            // ======================================

            cargarRegistros();

            cargarResumen();
        }

        catch(error) {

            console.log(error);

        }

    }

);

// ======================================
// CARGAR REGISTROS
// ======================================

async function cargarRegistros() {

    try {

        const respuesta =

            await fetch(

                `/api/vacaciones/personal/${id}/registros`

            );

        const registros =

            await respuesta.json();
                        console.log("Respuesta HTTP:", respuesta.status);

                        console.log("Registros recibidos:");

                        console.log(registros);
        const tbody =

            document.querySelector(

                '#tablaRegistros tbody'

            );

        tbody.innerHTML = '';

        registros.forEach(

            registro => {

                const fila =

                    document.createElement(
                        'tr'
                    );

                let estado = '';

                    const hoy = new Date();

                    const inicio =
                        new Date(
                            registro.fechaInicio
                        );

                    const fin =
                        new Date(
                            registro.fechaFin
                        );

                    if (hoy < inicio) {

                        estado = 'PROGRAMADA';

                    }

                    else if (

                        hoy >= inicio &&

                        hoy <= fin

                    ) {

                        estado = 'EN CURSO';

                    }

                    else {

                        estado = 'FINALIZADA';

                    }
                fila.innerHTML = `

                        <td>

                            <span class="tipo ${registro.tipo}">

                                ${registro.tipo}

                            </span>

                        </td>

                        <td>

                            ${registro.fechaInicio.substring(0,10)}

                        </td>

                        <td>

                            ${registro.fechaFin.substring(0,10)}

                        </td>

                        <td>

                            ${registro.dias}

                        </td>

                        <td>

                            <span class="estado">

                                ${estado}

                            </span>

                        </td>

                        <td>

                            <button
                                onclick="editarRegistro('${registro._id}')">

                                Editar

                            </button>

                            <button
                                onclick="eliminarRegistro('${registro._id}')">

                                Eliminar

                            </button>

                        </td>

                        `;

                tbody.appendChild(
                    fila
                );

            }

        );

    }

    catch(error) {

        console.log(error);

    }

}


cargarPersonal();
cargarResumen();
cargarRegistros();
// ======================================
// CARGAR RESUMEN
// ======================================

async function cargarResumen() {

    try {

        const respuesta =

            await fetch(

                `/api/vacaciones/personal/${id}/resumen`

            );

        const resumen =

            await respuesta.json();

        document.getElementById(
                'resumenVacacion'
            ).innerHTML = `

            <div class="cardResumen">

                <h3>
                    Corresponde
                </h3>

                <h2>
                    ${resumen.corresponde}
                </h2>

            </div>

            <div class="cardResumen">

                <h3>
                    Usados
                </h3>

                <h2>
                    ${resumen.usados}
                </h2>

            </div>

            <div class="cardResumen">

                <h3>
                    Programados
                </h3>

                <h2>
                    ${resumen.programados}
                </h2>

            </div>

            <div class="cardResumen">

                <h3>
                    Disponibles
                </h3>

                <h2>
                    ${resumen.disponible}
                </h2>

            </div>

            `;

    }

    catch(error) {

        console.log(error);

    }

}

// ======================================
// ELIMINAR REGISTRO
// ======================================

async function eliminarRegistro(

    idRegistro

) {

    const confirmar =

        confirm(

            '¿Eliminar registro?'

        );

    if (!confirmar) return;

    try {

        const respuesta =

            await fetch(

                `/api/vacaciones/${idRegistro}`,

                {

                    method: 'DELETE'

                }

            );

        const resultado =

            await respuesta.json();

        alert(

            resultado.mensaje

        );

        cargarRegistros();

        cargarResumen();

    }

    catch(error) {

        console.log(error);

    }

}
// ======================================
// CARGAR REGISTRO PARA EDITAR
// ======================================

async function editarRegistro(

    idRegistro

) {

    window.location.href =

        `/vacaciones/editar/${idRegistro}`;

}

