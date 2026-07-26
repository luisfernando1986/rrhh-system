// ======================================
// OBTENER ID DE LA URL
// ======================================

const id =
    window.location.pathname
        .split('/')
        .slice(-2)[0];

console.log('ID OBTENIDO:', id);

// ======================================
// CARGAR DATOS DEL PERSONAL
// ======================================

async function cargarDatos() {

    try {

        // Consultar API

        const respuesta =
            await fetch(
                `/api/personal/${id}`
            );

        // Convertir JSON

        const persona =
            await respuesta.json();
        // ======================================
        // CARGAR DATOS EN EL FORMULARIO
        // ======================================

        document.getElementById(
            'grado'
        ).value =
            persona.grado || '';

        document.getElementById(
            'arma'
        ).value =
            persona.arma || '';
        document.getElementById(
            'anioEgreso'
        ).value =
            persona.anioEgreso || '';

        document.getElementById(
            'aniosServicio'
        ).value =
            persona.aniosServicio || '';

        document.getElementById(
            'antiguedadGrado'
        ).value =
            persona.antiguedadGrado || '';
        

        document.getElementById(
            'carnetMilitar'
        ).value =
            persona.carnetMilitar || '';

        document.getElementById(
            'carnetCossmil'
        ).value =
            persona.carnetCossmil || '';

        document.getElementById(
            'institutoEgreso'
        ).value =
            persona.institutoEgreso || '';
        document.getElementById(
            'anioEgreso'
        ).value =
            persona.anioEgreso || '';
        calcularAniosServicio();
        
        
        document.getElementById(
            'nombres'
        ).value =
            persona.nombres || '';

        document.getElementById(
            'apellidoPaterno'
        ).value =
            persona.apellidoPaterno || '';

        document.getElementById(
            'apellidoMaterno'
        ).value =
            persona.apellidoMaterno || '';

        document.getElementById(
            'ci'
        ).value =
            persona.ci || '';

        document.getElementById(
            'celular'
        ).value =
            persona.celular || '';

        document.getElementById(
            'correoElectronico'
        ).value =
            persona.correoElectronico || '';
            // ======================================
            // CONTACTO
            // ======================================

            document.getElementById(
                'telefonoAlterno'
            ).value =
                persona.telefonoAlterno || '';

            document.getElementById(
                'domicilioActual'
            ).value =
                persona.domicilioActual || '';

            document.getElementById(
                'estadoCivil'
            ).value =
                persona.estadoCivil || '';


            // ======================================
            // DATOS FAMILIARES
            // ======================================

            document.getElementById(
                'nombrePadre'
            ).value =
                persona.nombrePadre || '';

            document.getElementById(
                'nombreMadre'
            ).value =
                persona.nombreMadre || '';

            document.getElementById(
                'nombreEsposa'
            ).value =
                persona.nombreEsposa || '';

            document.getElementById(
                'domicilioPadres'
            ).value =
                persona.domicilioPadres || '';
            
            document.getElementById(
                    'destinoGestionAnterior'
                ).value =
                    persona.destinoGestionAnterior || '';

                document.getElementById(
                    'destinoHaceDosGestiones'
                ).value =
                    persona.destinoHaceDosGestiones || '';
        console.log(persona);

    } catch (error) {

        console.log(error);

    }

}


// ======================================
// EJECUTAR
// ======================================

cargarDatos();

// ======================================
// CALCULAR AÑOS DE SERVICIO
// ======================================

function calcularAniosServicio() {

    const inputEgreso =

        document.getElementById(
            'anioEgreso'
        );

    const inputServicio =

        document.getElementById(
            'aniosServicio'
        );

    if (

        !inputEgreso ||

        !inputServicio

    ) return;

    const anioActual =

        new Date().getFullYear();

    const anioEgreso =

        parseInt(
            inputEgreso.value
        );

    if (anioEgreso) {

        inputServicio.value =

            (anioActual - anioEgreso) - 1;

    }

}


// ======================================
// EVENTO
// ======================================

document.getElementById(
    'anioEgreso'
).addEventListener(

    'input',

    calcularAniosServicio

);

// ======================================
// FORMULARIO DE EDICIÓN
// ======================================

const formulario =

    document.getElementById(
        'formEditar'
    );


// ======================================
// GUARDAR CAMBIOS
// ======================================

formulario.addEventListener(

    'submit',

    async function (e) {

        // Evitar recarga

        e.preventDefault();

        try {

            // Construir objeto

            const datos = {

                grado:

                    document.getElementById(
                        'grado'
                    ).value,

                arma:

                    document.getElementById(
                        'arma'
                    ).value,
                
                nombres:

                    document.getElementById(
                        'nombres'
                    ).value,

                apellidoPaterno:

                    document.getElementById(
                        'apellidoPaterno'
                    ).value,

                apellidoMaterno:

                    document.getElementById(
                        'apellidoMaterno'
                    ).value,

                ci:

                    document.getElementById(
                        'ci'
                    ).value,

                celular:

                    document.getElementById(
                        'celular'
                    ).value,

                correoElectronico:

                document.getElementById(
                    'correoElectronico'
                ).value,
                anioEgreso:

                    parseInt(
                        document.getElementById(
                            'anioEgreso'
                        ).value
                    ) || 0,

                aniosServicio:

                    parseInt(
                        document.getElementById(
                            'aniosServicio'
                        ).value
                    ) || 0,

                antiguedadGrado:

                    parseInt(
                        document.getElementById(
                            'antiguedadGrado'
                        ).value
                    ) || 0,

                    carnetMilitar:

                    document.getElementById(
                        'carnetMilitar'
                    ).value,

                carnetCossmil:

                    document.getElementById(
                        'carnetCossmil'
                    ).value,

                institutoEgreso:

                    document.getElementById(
                        'institutoEgreso'
                    ).value,
            // ======================================
            // CONTACTO
            // ======================================

            telefonoAlterno:

                document.getElementById(
                    'telefonoAlterno'
                ).value,

            domicilioActual:

                document.getElementById(
                    'domicilioActual'
                ).value,

            estadoCivil:

                document.getElementById(
                    'estadoCivil'
                ).value,

            // ======================================
            // DATOS FAMILIARES
            // ======================================

            nombrePadre:

                document.getElementById(
                    'nombrePadre'
                ).value,

            nombreMadre:

                document.getElementById(
                    'nombreMadre'
                ).value,

            nombreEsposa:

                document.getElementById(
                    'nombreEsposa'
                ).value,

            domicilioPadres:

                document.getElementById(
                    'domicilioPadres'
                ).value,

            destinoGestionAnterior:

                document.getElementById(
                    'destinoGestionAnterior'
                ).value,

            destinoHaceDosGestiones:

                document.getElementById(
                    'destinoHaceDosGestiones'
                ).value

            };

            // Enviar actualización

            const respuesta =

                await fetch(

                    `/api/personal/${id}`,

                    {

                        method: 'PUT',

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

            // Convertir respuesta

            const resultado =

                await respuesta.json();

            // Mostrar mensaje

            alert(

                resultado.mensaje

            );

            // Volver a ficha

            window.location.href =

                `/personal/${id}`;

        }

        catch (error) {

            console.log(error);

            alert(

                'Error al actualizar'

            );

        }

    }

);