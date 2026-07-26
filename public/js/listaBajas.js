// ======================================
// CARGAR PERSONAL
// ======================================

async function cargarPersonal() {

    try {

        const respuesta =

            await fetch(

                '/api/bajas-medicas/personal'

            );

        const personal =

            await respuesta.json();
            window.listaPersonal = personal;
        // ======================================
        // CONTENEDOR DE TARJETAS
        // ======================================

        const contenedor =

            document.getElementById(

                'listaPersonal'

            );

        contenedor.innerHTML = '';

        personal.forEach(persona => {

            // ======================================
            // CREAR TARJETA DEL PERSONAL
            // ======================================

            const card =

                document.createElement(

                    'div'

                );

            card.className =

                'cardPersonal';

            card.innerHTML = `

                <div class="encabezadoCard">

                    <div class="grado">

                        ${persona.grado || ''}

                    </div>

                    <div class="circuloEstado estado-${persona.colorEstado}">

                    </div>

                </div>

                <div class="arma">

                    ${persona.arma || ''}

                </div>

                <h3 class="apellido">

                    ${persona.apellidoPaterno || ''}

                    ${persona.apellidoMaterno || ''}

                </h3>

                <h2 class="nombre">

                    ${persona.nombres || ''}

                </h2>

                <div class="dato">

                    <span class="tituloDato">

                        CI

                    </span>

                    <span>

                        ${persona.ci || ''}

                    </span>

                </div>

                <hr>

                <div class="estadoTarjeta estado-${persona.colorEstado}">

                    ${persona.estadoMedico}

                </div>

                <div class="estadisticas">

                    <div class="filaDato">

                        <span>Total de bajas</span>

                        <strong>

                            ${persona.totalBajas}

                        </strong>

                    </div>

                    <div class="filaDato">

                        <span>Días acumulados</span>

                        <strong>

                            ${persona.diasAcumulados}

                        </strong>

                    </div>

                </div>

                <button

                    onclick="registrarBaja('${persona._id}')">

                    Registrar Baja Médica

                </button>

            `;

            contenedor.appendChild(card);

        });

    }

    catch(error){

        console.log(error);

    }

}

// ======================================
// IR A REGISTRAR BAJA
// ======================================

function registrarBaja(id){

    window.location.href =

        `/bajas-medicas/registrar/${id}`;

}

// ======================================
// INICIAR
// ======================================

cargarPersonal();

async function actualizarResumenGeneral(){

    const respuesta = await fetch(

        '/api/bajas-medicas/personal'

    );

    const personal = await respuesta.json();

    document.getElementById(

        'totalPersonal'

    ).textContent = personal.length;

    document.getElementById(

        'sinBajas'

    ).textContent =

        personal.filter(

            p => p.colorEstado === 'verde'

        ).length;

    document.getElementById(

        'enCurso'

    ).textContent =

        personal.filter(

            p => p.colorEstado === 'naranja'

        ).length;

    document.getElementById(

        'juntaMedica'

    ).textContent =

        personal.filter(

            p => p.colorEstado === 'rojo'

        ).length;

}

actualizarResumenGeneral();

// ======================================
// BUSCADOR DE PERSONAL
// ======================================

document.getElementById(

    'buscarPersonal'

).addEventListener(

    'input',

    function () {

        const texto =

            this.value.toLowerCase();

        const tarjetas =

            document.querySelectorAll(

                '.cardPersonal'

            );

        tarjetas.forEach((card, indice) => {

            const persona =

                window.listaPersonal[indice];

            const datos = `

                ${persona.grado || ''}

                ${persona.arma || ''}

                ${persona.apellidoPaterno || ''}

                ${persona.apellidoMaterno || ''}

                ${persona.nombres || ''}

                ${persona.ci || ''}

            `.toLowerCase();

            if(datos.includes(texto)){

                card.style.display='block';

            }

            else{

                card.style.display='none';

            }

        });

    }

);
// ======================================
// FILTRAR POR ESTADO
// ======================================

function filtrarEstado(color){

    const tarjetas =

        document.querySelectorAll(

            '.cardPersonal'

        );

    const botones =

        document.querySelectorAll(

            '.filtro'

        );

    botones.forEach(b=>{

        b.classList.remove(

            'activo'

        );

    });

    event.target.classList.add(

        'activo'

    );

    tarjetas.forEach((card,indice)=>{

        const persona =

            window.listaPersonal[indice];

        if(

            color==='todos'

        ){

            card.style.display='block';

            return;

        }

        if(

            persona.colorEstado===color

        ){

            card.style.display='block';

        }

        else{

            card.style.display='none';

        }

    });

}