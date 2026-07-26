// ======================================
// OBTENER ID DE LA URL
// ======================================

const id =
    window.location.pathname
        .split('/')
        .pop();


// ======================================
// CARGAR DATOS DE LA PERSONA
// ======================================

async function cargarFicha() {

    try {

        // Consultar API

        const respuesta =
            await fetch(
                `/api/personal/${id}`
            );

        // Convertir a JSON

        const persona =
            await respuesta.json();
        

        
        // ==========================
        // ENCABEZADO
        // ==========================

        document.getElementById(
            'datosEncabezado'
        ).innerHTML = `

            <!-- ====================== -->
            <!-- CONTENEDOR ENCABEZADO -->
            <!-- ====================== -->

            <div class="cabeceraFicha">

                <!-- ====================== -->
                <!-- DATOS -->
                <!-- ====================== -->

                <div class="datosCabecera">

                    <h2>

                        ${persona.grado || ''}

                        ${persona.arma || ''}

                    </h2>

                    <h2>

                        ${persona.nombres || ''}

                        ${persona.apellidoPaterno || ''}

                        ${persona.apellidoMaterno || ''}

                    </h2>

                    <h3>

                        CI:
                        ${persona.ci || ''}

                    </h3>

                    <a
                        href="/personal/${persona._id}/editar">

                        <button
                            class="btnEditar">

                            EDITAR

                        </button>

                    </a>

                </div>
                <!-- ====================== -->
                <!-- FOTOGRAFÍA -->
                <!-- ====================== -->

                <div class="fotoCabecera">

                    <img

                        class="fotoPersonal"

                        src="/uploads/fotos/${persona.fotografia}"

                        alt="Fotografía"

                    >

                </div>
                
            </div>

        `;

        // ==========================
        // CONTENIDO COMPLETO
        // ==========================

        document.getElementById(
            'contenidoFicha'
        ).innerHTML = `

            <!-- ====================== -->
            <!-- DATOS MILITARES -->
            <!-- ====================== -->

            <div class="seccion">

                <h2>

                    DATOS MILITARES

                </h2>

                <p>

                    <strong>Grado:</strong>

                    ${persona.grado || ''}

                </p>

                <p>

                    <strong>Arma:</strong>
                    
                    ${persona.arma || ''}

                </p>
                <p>

                    <strong>

                        Año de Egreso:

                    </strong>

                    ${persona.anioEgreso || ''}

                </p>

                <p>

                    <p>

                        <strong>

                            Años de Servicio:

                        </strong>

                        ${

                            persona.anioEgreso

                            ?

                            (
                                new Date().getFullYear()

                                - persona.anioEgreso

                                - 1
                            )

                            :

                            ''

                        }

                    </p>

                <p>

                    <strong>

                        Antigüedad en el Grado:

                    </strong>

                    ${persona.antiguedadGrado || ''}

                </p>
                
                
                <p>

                    <strong>Instituto de Egreso:</strong>

                    ${persona.institutoEgreso || ''}

                </p>

                <p>

                    <strong>Carnet Militar:</strong>

                    ${persona.carnetMilitar || ''}

                </p>

                <p>

                    <strong>Carnet COSSMIL:</strong>

                    ${persona.carnetCossmil || ''}

                </p>

            </div>


            <!-- ====================== -->
            <!-- DATOS PERSONALES -->
            <!-- ====================== -->

            <div class="seccion">

                <h2>

                    DATOS PERSONALES

                </h2>

                <p>

                    <strong>Fecha de Nacimiento:</strong>

                    ${persona.fechaNacimiento
                        ? new Date(
                            persona.fechaNacimiento
                        ).toLocaleDateString()
                        : ''}

                </p>

                <p>

                    <strong>Lugar de Nacimiento:</strong>

                    ${persona.lugarNacimiento || ''}

                </p>

                <p>

                    <strong>Departamento:</strong>

                    ${persona.departamento || ''}

                </p>

                <p>

                    <strong>Provincia:</strong>

                    ${persona.provincia || ''}

                </p>

                <p>

                    <strong>Localidad:</strong>

                    ${persona.localidad || ''}

                </p>

                <p>

                    <strong>Estado Civil:</strong>

                    ${persona.estadoCivil || ''}

                </p>

            </div>


            <!-- ====================== -->
            <!-- DATOS FAMILIARES -->
            <!-- ====================== -->

            <div class="seccion">

                <h2>

                    DATOS FAMILIARES

                </h2>

                <p>

                    <strong>Padre:</strong>

                    ${persona.nombrePadre || ''}

                </p>

                <p>

                    <strong>Madre:</strong>

                    ${persona.nombreMadre || ''}

                </p>

                <p>

                    <strong>Esposa:</strong>

                    ${persona.nombreEsposa || ''}

                </p>

                <p>

                    <strong>Domicilio Actual:</strong>

                    ${persona.domicilioActual || ''}

                </p>
                <p>

                 <strong>Domicilio Padres:</strong>
                            ${persona.domicilioPadres || ''}

                        </p>
            </div>


            <!-- ====================== -->
            <!-- CONTACTOS -->
            <!-- ====================== -->

            <div class="seccion">

                <h2>

                    CONTACTOS

                </h2>

                <p>

                    <strong>Celular:</strong>

                    ${persona.celular || ''}

                </p>

                <p>

                    <strong>Correo:</strong>

                    ${persona.correoElectronico || ''}

                </p>

            </div>
            <!-- ====================== -->
            <!-- REFERENCIAS -->
            <!-- ====================== -->

            <div class="seccion">

                <h2>

                    REFERENCIAS DE EMERGENCIA

                </h2>

                <table>

                    <thead>

                        <tr>

                            <th>

                                N°

                            </th>

                            <th>

                                Número

                            </th>

                            <th>

                                Parentesco

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr>

                            <td>

                                1

                            </td>

                            <td>

                                ${persona.referencia1?.numero || ''}

                            </td>

                            <td>

                                ${persona.referencia1?.parentesco || ''}

                            </td>

                        </tr>

                        <tr>

                            <td>

                                2

                            </td>

                            <td>

                                ${persona.referencia2?.numero || ''}

                            </td>

                            <td>

                                ${persona.referencia2?.parentesco || ''}

                            </td>

                        </tr>

                        <tr>

                            <td>

                                3

                            </td>

                            <td>

                                ${persona.referencia3?.numero || ''}

                            </td>

                            <td>

                                ${persona.referencia3?.parentesco || ''}

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

            <!-- ====================== -->
            <!-- INFORMACIÓN MÉDICA -->
            <!-- ====================== -->

            <div class="seccion">

                <h2>

                    INFORMACIÓN MÉDICA

                </h2>

                <p>

                    <strong>Grupo Sanguíneo:</strong>

                    ${persona.grupoSanguineo || ''}

                </p>

                <p>

                    <strong>Peso:</strong>

                    ${persona.peso || ''}

                </p>

                <p>

                    <strong>Estatura:</strong>

                    ${persona.estatura || ''}

                </p>

                <p>

                    <strong>Alergias:</strong>

                    ${persona.alergias || ''}

                </p>

            </div>


            <!-- ====================== -->
            <!-- HIJOS -->
            <!-- ====================== -->

            <div class="seccion">

                <h2>

                    HIJOS

                </h2>

                <table>

                    <thead>

                        <tr>

                            <th>

                                N°

                            </th>

                            <th>

                                Nombre

                            </th>

                            <th>

                                Sexo

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        ${

                            persona.hijos &&
                            persona.hijos.length > 0

                            ?

                            persona.hijos.map(

                                (hijo, index) => `

                                    <tr>

                                        <td>

                                            ${index + 1}

                                        </td>

                                        <td>

                                            ${hijo.nombre || ''}

                                        </td>

                                        <td>

                                            ${hijo.sexo || ''}

                                        </td>

                                    </tr>

                                `

                            ).join('')

                            :

                            `

                                <tr>

                                    <td colspan="3">

                                        Sin registros

                                    </td>

                                </tr>

                            `

                        }

                    </tbody>

                </table>

            </div>
            

            <!-- ====================== -->
            <!-- DESTINOS ANTERIORES -->
            <!-- ====================== -->

            <div class="seccion">

                <h2>

                    DESTINOS ANTERIORES

                </h2>

                <p>

                    <strong>Gestión Anterior:</strong>

                    ${persona.destinoGestionAnterior || 'Sin registro'}

                </p>

                <p>

                    <strong>Hace Dos Gestiones:</strong>

                    ${persona.destinoHaceDosGestiones || 'Sin registro'}

                </p>

            </div>

            <!-- ====================== -->
            <!-- CURSOS -->
            <!-- ====================== -->

            <div class="seccion">

                <h2>

                    CURSOS Y ESPECIALIDADES

                </h2>

                <ul>

                    ${

                        persona.cursos &&
                        persona.cursos.length > 0

                        ?

                        persona.cursos.map(

                            curso => `

                                <li>

                                    ${curso}

                                </li>

                            `

                        ).join('')

                        :

                        `

                            <li>

                                Sin registros

                            </li>

                        `

                    }

                </ul>

            </div>

            `;
        

    } catch (error) {

        console.log(error);

    }

}


// ======================================
// EJECUTAR
// ======================================

cargarFicha();

// ======================================
// BOTÓN IMPRIMIR
// ======================================

const botonImprimir =

    document.getElementById(
        'btnImprimir'
    );


// Verificar que exista

if (botonImprimir) {

    botonImprimir.addEventListener(

        'click',

        function () {

            // Abrir impresión

            window.print();

        }

    );

}
// ======================================
// BOTÓN GENERAR FILIACIÓN
// ======================================

const botonPDF =

    document.getElementById(
        'btnPDF'
    );


// Verificar existencia

if (botonPDF) {

    botonPDF.addEventListener(

        'click',

        function () {

            // Abrir PDF

            window.open(

                `/personal/${id}/filiacion`,

                '_blank'

            );

        }

    );

}