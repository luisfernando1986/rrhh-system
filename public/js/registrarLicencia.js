// ======================================
// CARGAR PERSONAL
// ======================================

async function cargarPersonal() {

    try {

        const respuesta =

            await fetch(

                '/api/licencias/personal'

            );

        const personal =

            await respuesta.json();

        const select =

            document.getElementById(

                'personalId'

            );

        personal.forEach(

            persona => {

                const option =

                    document.createElement(

                        'option'

                    );

                option.value =

                    persona._id;

                option.textContent =

                    `${persona.grado || ''} ${persona.apellidoPaterno || ''} ${persona.apellidoMaterno || ''} ${persona.nombres || ''}`;

                select.appendChild(

                    option

                );

            }

        );

    }

    catch(error){

        console.log(error);

    }

}

cargarPersonal();
// ======================================
// TIPO DE LICENCIA
// ======================================

const tipoLicencia =

    document.getElementById(
        'tipoLicencia'
    );

// ======================================
// DÍAS
// ======================================

const dias =

    document.getElementById(
        'dias'
    );

// ======================================
// CALCULAR DÍAS AUTOMÁTICOS
// ======================================

tipoLicencia.addEventListener(

    'change',

    () => {

        switch (

            tipoLicencia.value

        ) {

            case 'FALLECIMIENTO':

                dias.value = 10;

                break;

            case 'CALAMIDAD':

                dias.value = 15;

                break;

            case 'MATRIMONIO':

                dias.value = 8;

                break;

            case 'PATERNIDAD':

                dias.value = 3;

                break;

            case 'MATERNIDAD':

                dias.value = 90;

                break;

            case 'DJBR':

                dias.value = 1;

                break;

            case 'PAPANICOLAOU':

                dias.value = 1;

                break;

            case 'MAMOGRAFIA':

                dias.value = 1;

                break;

            case 'PROSTATA':

                dias.value = 1;

                break;

            case 'PSA':

                dias.value = 1;

                break;

            case 'COLON':

                dias.value = 1;

                break;

            default:

                dias.value = '';

        }

    }

);

// ======================================
// GUARDAR FORMULARIO
// ======================================

document.getElementById('formLicencia')

.addEventListener('submit', async (e) => {

    e.preventDefault();

    try {

        const datos = {

            personalId: document.getElementById('personalId').value,

            tipoLicencia: document.getElementById('tipoLicencia').value,

            fechaInicio: document.getElementById('fechaInicio').value,

            dias: document.getElementById('dias').value,

            observacion: document.getElementById('observacion').value

        };

        const respuesta = await fetch(

            '/api/licencias',

            {

                method: 'POST',

                headers: {

                    'Content-Type': 'application/json'

                },

                body: JSON.stringify(datos)

            }

        );

        const resultado = await respuesta.json();

        alert(resultado.mensaje);

        window.location.href = '/licencias';

    }

    catch(error){

        console.log(error);

    }

});