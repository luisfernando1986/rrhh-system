// ======================================
// OBTENER ID DE LICENCIA DESDE URL
// ======================================

const partes = window.location.pathname.split('/');

const licenciaId = partes[partes.length - 1];


// ======================================
// CARGAR LICENCIA
// ======================================

async function cargarLicencia() {

    try {

        const respuesta = await fetch(
            `/api/licencias/${licenciaId}`
        );

        const licencia = await respuesta.json();


        document.getElementById('tipoLicencia').value =
            licencia.tipoLicencia;


        document.getElementById('fechaInicio').value =
            licencia.fechaInicio.substring(0,10);


        document.getElementById('dias').value =
            licencia.dias;


        document.getElementById('observacion').value =
            licencia.observacion || '';


        cargarPersonal(licencia.personalId._id);


    }

    catch(error){

        console.log(error);

    }

}


// ======================================
// CARGAR PERSONAL
// ======================================

async function cargarPersonal(idSeleccionado){

    const respuesta = await fetch(
        '/api/licencias/personal'
    );


    const personal = await respuesta.json();


    const select =
        document.getElementById('personalId');


    select.innerHTML='';


    personal.forEach(persona=>{


        const option =
            document.createElement('option');


        option.value =
            persona._id;


        option.textContent =
            `${persona.grado} ${persona.apellidoPaterno} ${persona.apellidoMaterno} ${persona.nombres}`;


        if(persona._id === idSeleccionado){

            option.selected=true;

        }


        select.appendChild(option);


    });


}
// ======================================
// CALCULAR DÍAS AUTOMÁTICOS AL EDITAR
// ======================================

document
.getElementById('tipoLicencia')
.addEventListener('change', () => {


    const tipo =
    document.getElementById('tipoLicencia').value;


    const dias =
    document.getElementById('dias');


    switch(tipo){

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


});

// ======================================
// GUARDAR CAMBIOS
// ======================================

document
.getElementById('formEditarLicencia')
.addEventListener('submit', async(e)=>{


    e.preventDefault();


    const datos = {


        personalId:
        document.getElementById('personalId').value,


        tipoLicencia:
        document.getElementById('tipoLicencia').value,


        fechaInicio:
        document.getElementById('fechaInicio').value,


        dias:
        Number(document.getElementById('dias').value),


        observacion:
        document.getElementById('observacion').value


    };


    const respuesta = await fetch(

        `/api/licencias/${licenciaId}`,

        {

            method:'PUT',

            headers:{

                'Content-Type':'application/json'

            },

            body:JSON.stringify(datos)

        }

    );


    const resultado =
        await respuesta.json();


    alert(resultado.mensaje);


    window.location.href='/licencias';


});


// ======================================
// INICIO
// ======================================

cargarLicencia();