// ======================================
// EDITAR VACACIÓN
// Archivo:
// public/js/pages/editarVacacion.js
// ======================================


// ======================================
// OBTENER EL ID DE LA VACACIÓN
// DESDE LA URL
// ======================================

const id = window.location.pathname
    .split('/')
    .pop();


// ======================================
// CARGAR DATOS DE LA VACACIÓN
// ======================================

async function cargarRegistro() {

    try {

        // Obtener la vacación desde el servidor
        const registro =
            await obtenerVacacionPorId(id);
        // ======================================
        // MOSTRAR DATOS DEL REGISTRO
        // ======================================

        document.getElementById(
            'datosRegistro'
        ).innerHTML = `

            <div class="cardResumen">

                <h3>Personal</h3>

                <p>

                    ${registro.personalId?.grado || ''}

                    ${registro.personalId?.arma || ''}

                </p>

            </div>

            <div class="cardResumen">

                <h3>Militar</h3>

                <p>

                    ${registro.personalId?.apellidoPaterno || ''}

                    ${registro.personalId?.apellidoMaterno || ''}

                    ${registro.personalId?.nombres || ''}

                </p>

            </div>

            <div class="cardResumen">

                <h3>Tipo</h3>

                <p>

                    ${registro.tipo}

                </p>

            </div>

        `;
        // Llenar el formulario
        document.getElementById('tipo').value =
            registro.tipo;

        document.getElementById('fechaInicio').value =
            registro.fechaInicio.substring(0, 10);

        document.getElementById('fechaFin').value =
            registro.fechaFin.substring(0, 10);

        document.getElementById('observacion').value =
            registro.observacion || '';

        // Mostrar días calculados
        actualizarPreviewDias();

    }

    catch (error) {

        console.error(error);

        alert("No se pudo cargar la vacación.");

    }

}


// ======================================
// GUARDAR CAMBIOS
// ======================================

document
    .getElementById('formEditar')
    .addEventListener(
        'submit',
        async function (e) {

            e.preventDefault();

            try {

                const fechaInicio =
                    document.getElementById('fechaInicio').value;

                const fechaFin =
                    document.getElementById('fechaFin').value;
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

                    tipo:
                        document.getElementById('tipo').value,

                    fechaInicio,

                    fechaFin,

                    observacion:
                        document.getElementById('observacion').value,

                    dias:
                        calcularDias(
                            fechaInicio,
                            fechaFin
                        )

                };

                const resultado =
                    await actualizarVacacion(
                        id,
                        datos
                    );

                alert(resultado.mensaje);

                history.back();

            }

            catch (error) {

                console.error(error);

                alert("No se pudo actualizar la vacación.");

            }

        }

    );


// ======================================
// PREVISUALIZAR LOS DÍAS
// ======================================

const fechaInicioInput =
    document.getElementById('fechaInicio');

const fechaFinInput =
    document.getElementById('fechaFin');

const previewDias =
    document.getElementById('previewDias');

function actualizarPreviewDias() {

    if (
        fechaInicioInput.value &&
        fechaFinInput.value
    ) {

        previewDias.textContent =
            calcularDias(
                fechaInicioInput.value,
                fechaFinInput.value
            );

    }

    else {

        previewDias.textContent = 0;

    }

}

fechaInicioInput.addEventListener(
    'change',
    actualizarPreviewDias
);

fechaFinInput.addEventListener(
    'change',
    actualizarPreviewDias
);


// ======================================
// INICIAR LA PÁGINA
// ======================================

cargarRegistro();

// ======================================
// VALIDAR FECHAS
// ======================================

function validarFechas(){

    const inicio =
        fechaInicioInput.value;

    const fin =
        fechaFinInput.value;

    if(
        inicio &&
        fin &&
        fin < inicio
    ){

        alert(
            'La fecha fin no puede ser menor que la fecha inicio.'
        );

        fechaFinInput.value='';

        previewDias.textContent=0;

        return false;

    }

    return true;

}

fechaInicioInput.addEventListener(

    'change',

    validarFechas

);

fechaFinInput.addEventListener(

    'change',

    validarFechas

);

