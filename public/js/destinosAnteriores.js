// ======================================
// VARIABLE ROL USUARIO
// ======================================

let rolUsuario = '';


// ======================================
// CARGAR ROL DEL USUARIO
// ======================================

async function cargarRol(){

    const respuesta = await fetch(
        '/api/usuario-actual'
    );

    const usuario = await respuesta.json();

    rolUsuario = usuario.rol;

}

// ======================================
// CARGAR PERSONAL
// ======================================

async function cargarPersonal() {

    try {

        const respuesta =

            await fetch('/api/destinos/listado');

        const personal =

            await respuesta.json();

        // ======================================
        // OBTENER CUERPO DE LA TABLA
        // ======================================

        const tabla =

            document.querySelector(
                '#tablaDestinos tbody'
            );


        // ======================================
        // LIMPIAR SOLO FILAS
        // ======================================

        tabla.innerHTML = '';

        personal.forEach(

            persona => {

                tabla.innerHTML += `

                    <tr>

                        <td>

                            ${persona.grado || ''}

                        </td>

                        <td>

                            ${persona.arma || ''}

                        </td>

                        <td>

                            ${persona.nombres || ''}

                            ${persona.apellidoPaterno || ''}

                            ${persona.apellidoMaterno || ''}

                        </td>
                        <td>

                            ${persona.anioEgreso || ''}

                        </td>

                        <td>

                            ${persona.antiguedadGrado || ''}

                        </td>

                        

                        <td>

                            ${persona.destinoHaceDosGestiones || ''}

                        </td>

                        <td>

                            ${persona.destinoGestionAnterior || ''}

                        </td>

                        <td>

                            <a

                                class="btnEditar"

                                href="/destinos-anteriores/${persona._id}/editar">

                                EDITAR

                            </a>

                        </td>

                    </tr>

                `;

            }

        );

    }

    catch (error) {

        console.log(error);

    }

}


// ======================================
// INICIAR
// ======================================

cargarPersonal();