// ======================================
// CARGAR TODO EL PERSONAL
// ======================================

async function cargarPersonal() {

    try {

        const respuesta = await fetch(
            '/api/personal/consulta-general'
        );

        const personal = await respuesta.json();

        window.listaPersonal = personal;

        const tbody = document.querySelector(
            '#tablaPersonal tbody'
        );

        tbody.innerHTML = '';

        personal.forEach(persona => {

            const fila = document.createElement('tr');

            // =====================================
            // CALCULAR EDAD
            // =====================================

            let edad = '';

            if (persona.fechaNacimiento) {

                const hoy = new Date();

                const nacimiento = new Date(persona.fechaNacimiento);

                edad = hoy.getFullYear() - nacimiento.getFullYear();

                const mes = hoy.getMonth() - nacimiento.getMonth();

                if (
                    mes < 0 ||
                    (mes === 0 && hoy.getDate() < nacimiento.getDate())
                ) {

                    edad--;

                }

            }

            // =====================================
            // FECHA DE REGISTRO
            // =====================================

            let fechaRegistro = '';

            if (persona.fechaRegistro) {

                fechaRegistro =
                    new Date(
                        persona.fechaRegistro
                    ).toLocaleDateString();

            }

            fila.innerHTML = `

<td>${persona.grado || ''}</td>
<td>${persona.arma || ''}</td>
<td>${persona.nombres || ''}</td>
<td>${persona.apellidoPaterno || ''}</td>
<td>${persona.apellidoMaterno || ''}</td>

<td>${persona.ci || ''}</td>
<td>${persona.complemento || ''}</td>
<td>${persona.extension || ''}</td>
<td>${persona.carnetMilitar || ''}</td>
<td>${persona.carnetCossmil || ''}</td>

<td>${persona.institutoEgreso || ''}</td>
<td>${persona.anioEgreso || ''}</td>
<td>${persona.aniosServicio || ''}</td>
<td>${persona.antiguedadGrado || ''}</td>





<td>${
persona.fechaNacimiento
? new Date(persona.fechaNacimiento).toLocaleDateString()
: ''
}</td>

<td>${edad}</td>

<td>${persona.lugarNacimiento || ''}</td>
<td>${persona.departamento || ''}</td>
<td>${persona.provincia || ''}</td>
<td>${persona.localidad || ''}</td>

<td>${persona.estadoCivil || ''}</td>
<td>${persona.domicilioActual || ''}</td>
<td>${persona.celular || ''}</td>
<td>${persona.telefonoAlterno || ''}</td>
<td>${persona.correoElectronico || ''}</td>

<td>${persona.grupoSanguineo || ''}</td>
<td>${persona.peso || ''}</td>
<td>${persona.estatura || ''}</td>
<td>${persona.alergias || ''}</td>

<td>${persona.nombrePadre || ''}</td>
<td>${persona.nombreMadre || ''}</td>
<td>${persona.domicilioPadres || ''}</td>
<td>${persona.nombreEsposa || ''}</td>

<td>${persona.hijos ? persona.hijos.length : 0}</td>

<td>${persona.destinoGestionAnterior || ''}</td>
<td>${persona.destinoHaceDosGestiones || ''}</td>

<td>${fechaRegistro}</td>

<td>

<button
class="btnVer"
onclick="window.location.href='/consulta-general/${persona._id}'">

Ver Ficha

</button>

</td>

`;

            tbody.appendChild(fila);

        });

    }

    catch (error) {

        console.log(error);

    }

}

// ======================================
// CARGAR
// ======================================

cargarPersonal();


// ======================================
// BUSCADOR
// ======================================

document
.getElementById('buscar')
.addEventListener('input', function () {

    const texto =
        this.value.toLowerCase();

    const filas =
        document.querySelectorAll(
            '#tablaPersonal tbody tr'
        );

    filas.forEach((fila, indice) => {

        const persona =
            window.listaPersonal[indice];

        const datos = `

${persona.grado || ''}
${persona.arma || ''}
${persona.nombres || ''}
${persona.apellidoPaterno || ''}
${persona.apellidoMaterno || ''}
${persona.ci || ''}
${persona.carnetMilitar || ''}
${persona.institutoEgreso || ''}
${persona.celular || ''}

        `.toLowerCase();

        fila.style.display =
            datos.includes(texto)
            ? ''
            : 'none';

    });

});