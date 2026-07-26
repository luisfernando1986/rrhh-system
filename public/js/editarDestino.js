// ======================================
// OBTENER ID DE LA URL
// ======================================

const id =
    window.location.pathname
        .split('/')
        .slice(-2)[0];

console.log("ID DESTINO:", id);

// ======================================
// CARGAR DATOS DEL PERSONAL
// ======================================

async function cargarDatos() {

    try {

        const respuesta =

            await fetch(`/api/destinos/${id}`);
        

        const persona = await respuesta.json()

            
        console.log(persona);

        // ======================================
        // MOSTRAR DATOS
        // ======================================

        document.getElementById('gradoMostrar').value =
            persona.grado || '';

        document.getElementById('nombreMostrar').value =
            `${persona.nombres || ''} ${persona.apellidoPaterno || ''} ${persona.apellidoMaterno || ''}`;


        // ======================================
        // DESTINOS
        // ======================================

        document.getElementById(
            'destino2024'
        ).value =

            persona.destinoHaceDosGestiones || '';


        document.getElementById(
            'destino2025'
        ).value =

            persona.destinoGestionAnterior || '';

    }

    catch (error) {

        console.log(error);

    }

}


// ======================================
// EJECUTAR
// ======================================

cargarDatos();


// ======================================
// FORMULARIO
// ======================================

const formulario =

    document.getElementById(
        'formDestino'
    );


// ======================================
// GUARDAR
// ======================================

formulario.addEventListener(

    'submit',

    async function (e) {

        e.preventDefault();

        try {

            const datos = {

                destinoHaceDosGestiones:

                    document.getElementById(
                        'destino2024'
                    ).value
                    .toUpperCase(),

                destinoGestionAnterior:

                    document.getElementById(
                        'destino2025'
                    ).value
                    .toUpperCase()

            };


            const respuesta =

                await fetch(`/api/destinos/${id}`, {

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

            const resultado = await respuesta.json();

                console.log(resultado);


                if(!respuesta.ok){

                    throw new Error(
                        resultado.mensaje || 
                        "Error al actualizar"
                    );

                }


                alert(
                    'Destinos actualizados correctamente'
                );

            window.location.href =

                '/destinos-anteriores';

        }

        catch (error) {

            console.log(error);

            alert(

                'Error al guardar'

            );

        }

    }

);