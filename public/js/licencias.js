// ======================================
// CARGAR LICENCIAS (CON FILTROS)
// ======================================

let todasLicencias = [];

async function cargarLicencias() {

    try {

        const respuesta =

            await fetch(

                '/api/licencias/listado'

            );

        const licencias = await respuesta.json();

        todasLicencias = licencias;

        renderLicencias(licencias);

    }

    catch(error){

        console.log(error);

    }

}

// ======================================
// RENDER TABLA
// ======================================

function renderLicencias(lista) {

    const tbody = document.querySelector('#tablaLicencias tbody');

    tbody.innerHTML = '';

    lista.forEach(licencia => {

        const fila = document.createElement('tr');

        fila.innerHTML = `

            <td>
                ${licencia.personalId?.grado || ''} 
                ${licencia.personalId?.arma || ''} 
                ${licencia.personalId?.apellidoPaterno || ''} 
                ${licencia.personalId?.apellidoMaterno || ''} 
                ${licencia.personalId?.nombres || ''}
            </td>

            <td>${licencia.tipoLicencia}</td>

            <td>${licencia.fechaInicio.substring(0,10)}</td>

            <td>${licencia.fechaFin.substring(0,10)}</td>

            <td>${licencia.dias}</td>

            <td>

                <a
                class="btnEditar"
                href="/licencias/editar/${licencia._id}">

                EDITAR

                </a>


                <button
                class="btnEliminar"
                onclick="eliminarLicencia('${licencia._id}')">

                ELIMINAR

                </button>

                </td>

        `;

        tbody.appendChild(fila);

    });

}

// ======================================
// EDITAR LICENCIA
// ======================================

function editarLicencia(id) {

    window.location.href =
        `/licencias/editar/${id}`;

}
// ======================================
// ELIMINAR LICENCIA
// ======================================

async function eliminarLicencia(id) {

    if(!confirm('¿Eliminar licencia?')) return;

    try {

        const res = await fetch(`/api/licencias/${id}`, {

            method: 'DELETE'

        });

        const data = await res.json();

        alert(data.mensaje);

        cargarLicencias();

    }

    catch(error){

        console.log(error);

    }

}

// ======================================
// FILTROS
// ======================================

document.getElementById('filtroTipo')
.addEventListener('change', filtrar);

document.getElementById('filtroNombre')
.addEventListener('input', filtrar);

function filtrar() {

    const tipo = document.getElementById('filtroTipo').value.toLowerCase();

    const nombre = document.getElementById('filtroNombre').value.toLowerCase();

    const filtrado = todasLicencias.filter(l => {

        const matchTipo = tipo === '' || l.tipoLicencia.toLowerCase() === tipo;

        const nombreCompleto =

            `${l.personalId?.grado || ''} ${l.personalId?.apellidoPaterno || ''} ${l.personalId?.apellidoMaterno || ''} ${l.personalId?.nombres || ''}`
            .toLowerCase();

        const matchNombre = nombreCompleto.includes(nombre);

        return matchTipo && matchNombre;

    });

    renderLicencias(filtrado);

}
document.addEventListener('DOMContentLoaded',()=>{

    cargarLicencias();

    cargarEstadisticasLicencias();

});


async function cargarEstadisticasLicencias() {
    try {
        const res = await fetch('/api/licencias/estadisticas');
        const data = await res.json();

        document.getElementById('totalLicencias').textContent = data.total;
        document.getElementById('licenciasActivas').textContent = data.activas;
        document.getElementById('licenciasVencidas').textContent = data.vencidas;

        const contenedor = document.getElementById('licenciasPorTipo');
        contenedor.innerHTML = '';

        Object.entries(data.porTipo).forEach(([tipo, cantidad]) => {
            const div = document.createElement('div');
            div.classList.add('badge-tipo');
            div.textContent = `${tipo}: ${cantidad}`;
            contenedor.appendChild(div);
        });

    } catch (error) {
        console.error('Error cargando estadísticas:', error);
    }
}

// ejecutar al cargar página
document.addEventListener('DOMContentLoaded', () => {
    cargarEstadisticasLicencias();
});

function filtrarLicenciasActivas(){

    const hoy = new Date();


    const activas = todasLicencias.filter(l => {


        const inicio = new Date(l.fechaInicio);

        const fin = new Date(l.fechaFin);


        return hoy >= inicio && hoy <= fin;


    });


    renderLicencias(activas);

}



function filtrarLicenciasVencidas(){


    const hoy = new Date();


    const vencidas = todasLicencias.filter(l=>{


        const fin = new Date(l.fechaFin);


        return fin < hoy;


    });


    renderLicencias(vencidas);


}

// ======================================
// BOTONES DE FILTRO
// ======================================


function mostrarTodasLicencias(){

    renderLicencias(todasLicencias);

}



