// ======================================
// CARGAR CONFIGURACIÓN
// ======================================

async function cargarConfiguracion() {

    try {

        const respuesta = await fetch(

            '/api/configuracion'

        );

        const config = await respuesta.json();

        document.getElementById(

            'registroUsuarios'

        ).checked = config.registroUsuarios;

        document.getElementById(

            'registroPersonal'

        ).checked = config.registroPersonal;

        document.getElementById(

                'buscarPersonal'

            ).checked = config.buscarPersonal;

            document.getElementById(

                'destinos'

            ).checked = config.destinos;

            document.getElementById(

                'vacaciones'

            ).checked = config.vacaciones;

            document.getElementById(

                'licencias'

            ).checked = config.licencias;

            document.getElementById(

                'bajas'

            ).checked = config.bajas;

            document.getElementById(

                'consultaGeneral'

            ).checked = config.consultaGeneral;

    }

    catch(error){

        console.log(error);

    }

}

// ======================================
// GUARDAR CONFIGURACIÓN
// ======================================

document.getElementById(

    'guardarConfiguracion'

).addEventListener(

    'click',

    async ()=>{

        try{

            await fetch(

                '/api/configuracion',

                {

                    method:'PUT',

                    headers:{

                        'Content-Type':'application/json'

                    },

                    body: JSON.stringify({

                        registroUsuarios:

                        document.getElementById(
                            'registroUsuarios'
                        ).checked,


                        registroPersonal:

                        document.getElementById(
                            'registroPersonal'
                        ).checked,


                        buscarPersonal:

                        document.getElementById(
                            'buscarPersonal'
                        ).checked,


                        destinos:

                        document.getElementById(
                            'destinos'
                        ).checked,


                        vacaciones:

                        document.getElementById(
                            'vacaciones'
                        ).checked,


                        licencias:

                        document.getElementById(
                            'licencias'
                        ).checked,


                        bajas:

                        document.getElementById(
                            'bajas'
                        ).checked,


                        consultaGeneral:

                        document.getElementById(
                            'consultaGeneral'
                        ).checked

                    })

                }

            );

            alert(

                'Configuración guardada correctamente.'

            );

        }

        catch(error){

            console.log(error);

        }

    }

);

cargarConfiguracion();