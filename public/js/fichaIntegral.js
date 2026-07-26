//==============================================
// OBTENER ID DEL PERSONAL
//==============================================

const id = window.location.pathname.split('/').pop();

//==============================================
// CARGAR FICHA INTEGRAL
//==============================================

async function cargarFicha() {

    try {

        const respuesta = await fetch(`/api/personal/${id}`);

        if (!respuesta.ok) {
            throw new Error('No se pudo obtener la información del personal.');
        }

        const persona = await respuesta.json();

        mostrarCabecera(persona);

        mostrarDatosMilitares(persona);

        mostrarDatosPersonales(persona);

        mostrarDatosMedicos(persona);

        mostrarDatosFamilia(persona);

    } catch (error) {

        console.error(error);

        alert('Error al cargar la ficha del personal.');

    }

}

//==============================================
// CABECERA
//==============================================
function mostrarCabecera(persona) {

    const foto = persona.fotografia
        ? `/uploads/fotos/${persona.fotografia}`
        : "/images/escudo.jpeg";

    document.getElementById("cabeceraPersonal").innerHTML = `

        <div class="cabeceraFicha">

            <div class="fotoPersonal">

                <img
                    src="${foto}"
                    alt="Fotografía">

            </div>

            <div class="datosCabecera">

                <h1>

                    ${persona.grado || ""}
                    ${persona.nombres || ""}
                    ${persona.apellidoPaterno || ""}
                    ${persona.apellidoMaterno || ""}

                </h1>

                <p>

                    <strong>C.I.:</strong>

                    ${persona.ci || ""}

                    ${persona.extension || ""}

                </p>

                <p>

                    <strong>Carnet Militar:</strong>

                    ${persona.carnetMilitar || "-"}

                </p>

                <p>

                    <strong>Carnet COSSMIL:</strong>

                    ${persona.carnetCossmil || "-"}

                </p>

                <p>

                    <strong>Arma:</strong>

                    ${persona.arma || "-"}

                </p>

                <p>

                    <strong>Instituto:</strong>

                    ${persona.institutoEgreso || "-"}

                </p>

                <p>

                    <strong>Año de egreso:</strong>

                    ${persona.anioEgreso || "-"}

                </p>

                <p>

                    <strong>Años de servicio:</strong>

                    ${persona.aniosServicio || "-"}

                </p>

                <p>

                    <strong>Antigüedad:</strong>

                    ${persona.antiguedadGrado || "-"}

                    años

                </p>

                <p>

                    <strong>Destino actual:</strong>

                    ${persona.destinoActual || "-"}

                </p>

            </div>

        </div>

    `;

}

//==============================================
// DATOS MILITARES
//==============================================

//==============================================
// DATOS MILITARES
//==============================================

function mostrarDatosMilitares(persona){

    document.getElementById("datosMilitares").innerHTML = `

        <div class="gridFicha">

            <div class="itemFicha">

                <label>Grado</label>

                <span>${persona.grado || "-"}</span>

            </div>

            <div class="itemFicha">

                <label>Arma</label>

                <span>${persona.arma || "-"}</span>

            </div>

            <div class="itemFicha">

                <label>Cargo</label>

                <span>${persona.cargo || "-"}</span>

            </div>

            <div class="itemFicha">

                <label>Destino Actual</label>

                <span>${persona.destinoActual || "-"}</span>

            </div>

            <div class="itemFicha">

                <label>Instituto de Egreso</label>

                <span>${persona.institutoEgreso || "-"}</span>

            </div>

            <div class="itemFicha">

                <label>Año de Egreso</label>

                <span>${persona.anioEgreso || "-"}</span>

            </div>

            <div class="itemFicha">

                <label>Carnet Militar</label>

                <span>${persona.carnetMilitar || "-"}</span>

            </div>

            <div class="itemFicha">

                <label>Carnet COSSMIL</label>

                <span>${persona.carnetCossmil || "-"}</span>

            </div>

        </div>

    `;

}

//==============================================
// DATOS PERSONALES
//==============================================

//==============================================
// DATOS PERSONALES
//==============================================

function mostrarDatosPersonales(persona){

    document.getElementById("datosPersonales").innerHTML = `

        <div class="gridFicha">

            <div class="itemFicha">

                <label>Fecha de Nacimiento</label>

                <span>

                    ${

                        persona.fechaNacimiento

                        ?

                        new Date(persona.fechaNacimiento)

                        .toLocaleDateString("es-BO")

                        :

                        "-"

                    }

                </span>

            </div>

            <div class="itemFicha">

                <label>Lugar de Nacimiento</label>

                <span>${persona.lugarNacimiento || "-"}</span>

            </div>

            <div class="itemFicha">

                <label>Estado Civil</label>

                <span>${persona.estadoCivil || "-"}</span>

            </div>

            <div class="itemFicha">

                <label>Celular</label>

                <span>${persona.celular || "-"}</span>

            </div>

            <div class="itemFicha">

                <label>Correo Electrónico</label>

                <span>${persona.correoElectronico || "-"}</span>

            </div>

            <div class="itemFicha">

                <label>Domicilio Actual</label>

                <span>${persona.domicilioActual || "-"}</span>

            </div>

        </div>

    `;

}

//==============================================
// DATOS MÉDICOS
//==============================================

function mostrarDatosMedicos(persona) {

    document.getElementById("datosMedicos").innerHTML = `
        <p><strong>Grupo sanguíneo:</strong> ${persona.grupoSanguineo || ""}</p>
        <p><strong>Alergias:</strong> ${persona.alergias || ""}</p>
        <p><strong>Observaciones:</strong> ${persona.observacionesMedicas || ""}</p>
    `;

}
//==============================================
// FAMILIA Y CONTACTO
//==============================================

function mostrarDatosFamilia(persona){

    let hijosHTML = "";

    if(persona.hijos && persona.hijos.length){

        hijosHTML = `

            <div class="gridFicha">

        `;

        persona.hijos.forEach((hijo,index)=>{

            hijosHTML += `

                <div class="itemFicha">

                    <label>Hijo ${index+1}</label>

                    <span>

                        <strong>${hijo.nombre || "-"}</strong>

                        <br>

                        Sexo: ${hijo.sexo || "-"}

                        <br>

                        Fecha:

                        ${

                            hijo.fechaNacimiento

                            ?

                            new Date(hijo.fechaNacimiento)

                            .toLocaleDateString("es-BO")

                            :

                            "-"

                        }

                    </span>

                </div>

            `;

        });

        hijosHTML += "</div>";

    }

    else{

        hijosHTML = `

            <div class="itemFicha">

                <label>Hijos</label>

                <span>No existen registros.</span>

            </div>

        `;

    }

    document.getElementById("datosFamilia").innerHTML = `

        <div class="gridFicha">

            <div class="itemFicha">

                <label>Padre</label>

                <span>${persona.nombrePadre || "-"}</span>

            </div>

            <div class="itemFicha">

                <label>Madre</label>

                <span>${persona.nombreMadre || "-"}</span>

            </div>

            <div class="itemFicha">

                <label>Esposa</label>

                <span>${persona.nombreEsposa || "-"}</span>

            </div>

            <div class="itemFicha">

                <label>Domicilio Padres</label>

                <span>${persona.domicilioPadres || "-"}</span>

            </div>

            <div class="itemFicha">

                <label>Celular</label>

                <span>${persona.celular || "-"}</span>

            </div>

            <div class="itemFicha">

                <label>Teléfono Alterno</label>

                <span>${persona.telefonoAlterno || "-"}</span>

            </div>

            <div class="itemFicha">

                <label>Correo Electrónico</label>

                <span>${persona.correoElectronico || "-"}</span>

            </div>

        </div>

        <br>

        <h3>Hijos Registrados</h3>

        ${hijosHTML}

    `;

}
//==============================================

cargarFicha();