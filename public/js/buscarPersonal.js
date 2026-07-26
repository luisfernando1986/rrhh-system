// ======================================
// FORMULARIO DE BUSQUEDA
// ======================================

const formulario =
    document.getElementById(
        'formBuscar'
    );

// ======================================
// EVENTO BUSCAR
// ======================================

formulario.addEventListener(

    'submit',

    async function (e) {

        // Evitar recargar página

        e.preventDefault();

        // Obtener texto escrito

        const texto =
            document.getElementById(
                'busqueda'
            ).value;

        // Consultar API

        const respuesta =
            await fetch(

                `/buscar?texto=${texto}`

            );

        // Convertir a JSON

        const datos =
            await respuesta.json();

        // Contenedor resultados

        const resultado =
            document.getElementById(
                'resultado'
            );

        // Limpiar resultados anteriores

        resultado.innerHTML = '';

        // Si no encuentra registros

        if (datos.length === 0) {

            resultado.innerHTML = `

                <p>

                    No se encontraron registros

                </p>

            `;

            return;

        }

        datos.forEach(persona => {

            const foto = persona.fotografia
                ? `/uploads/fotos/${persona.fotografia}`
                : '/images/escudo.jpeg';

            resultado.innerHTML += `

            <div class="seccion">

                <div class="tarjetaResultado">

                    <img
                        src="${foto}"
                        alt="Foto"
                        class="tarjetaFoto">

                    <div class="tarjetaDatos">

                        <h3>

                            ${persona.grado || ''}

                            ${persona.nombres || ''}

                            ${persona.apellidoPaterno || ''}

                            ${persona.apellidoMaterno || ''}

                        </h3>

                        <p>

                            <strong>Arma:</strong>

                            ${persona.arma || '-'}

                        </p>

                        <p>

                            <strong>C.I.:</strong>

                            ${persona.ci || '-'}

                        </p>

                        <p>

                            <strong>Destino:</strong>

                            ${persona.destinoActual || '-'}

                        </p>

                        <div class="tarjetaAcciones">

                            <a
                                href="/personal/${persona._id}"
                                class="btnVer">

                            VER FICHA

                        </a>
                    </div>
                    </div>

                </div>

            </div>

            `;

        });

    }

);