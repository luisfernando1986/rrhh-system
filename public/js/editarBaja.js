// ======================================
// OBTENER ID DE LA BAJA MÉDICA
// ======================================

const id = window.location.pathname.split('/').pop();


// ======================================
// CARGAR BAJA MÉDICA
// ======================================

async function cargarBaja() {

    try {

        const respuesta = await fetch(

            `/api/bajas-medicas/${id}`

        );

        const baja = await respuesta.json();

        document.getElementById('entidadMedica').value =
            baja.entidadMedica || '';

        document.getElementById('medico').value =
            baja.medico || '';

        document.getElementById('especialidad').value =
            baja.especialidad || '';

        document.getElementById('numeroCertificado').value =
            baja.numeroCertificado || '';

        document.getElementById('diagnostico').value =
            baja.diagnostico || '';

        document.getElementById('fechaInicio').value =
            baja.fechaInicio.substring(0, 10);

        document.getElementById('fechaFin').value =
            baja.fechaFin.substring(0, 10);

        document.getElementById('dias').value =
            baja.dias || 0;

        document.getElementById('observacion').value =
            baja.observacion || '';

    }

    catch (error) {

        console.log(error);

        alert('Error al cargar la baja médica');

    }

}

cargarBaja();


// ======================================
// CALCULAR DÍAS
// ======================================

function calcularDias() {

    const inicio =
        document.getElementById('fechaInicio').value;

    const fin =
        document.getElementById('fechaFin').value;

    if (!inicio || !fin) return;

    const fechaInicio = new Date(inicio);

    const fechaFin = new Date(fin);

    const dias =

        Math.floor(

            (fechaFin - fechaInicio)

            / (1000 * 60 * 60 * 24)

        ) + 1;

    document.getElementById('dias').value = dias;

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
// GUARDAR CAMBIOS
// ======================================

document.getElementById(

    'formBaja'

).addEventListener(

    'submit',

    async function (e) {

        e.preventDefault();

        try {

            const datos = {

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

                    `/api/bajas-medicas/${id}`,

                    {

                        method: 'PUT',

                        headers: {

                            'Content-Type':

                                'application/json'

                        },

                        body:

                            JSON.stringify(datos)

                    }

                );

            const resultado =

                await respuesta.json();

            alert(resultado.mensaje);

            history.back();

        }

        catch (error) {

            console.log(error);

            alert('Error al actualizar');

        }

    }

);