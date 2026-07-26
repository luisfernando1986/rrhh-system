async function cargarUsuarios() {

    const resUsuarios = await fetch('/api/configuracion/usuarios');

    const usuarios = await resUsuarios.json();

    const resPersonal = await fetch('/api/personal');

    const personal = await resPersonal.json();

    const tbody = document.querySelector('#tablaUsuarios tbody');

    tbody.innerHTML = '';

    usuarios.forEach(usuario => {

        let opciones = '<option value="">-- Sin asociar --</option>';

        personal.forEach(persona => {

            opciones += `

                <option
                    value="${persona._id}"
                    ${usuario.personalId == persona._id ? 'selected' : ''}>

                    ${persona.grado || ''}

                    ${persona.nombres}

                    ${persona.apellidoPaterno}

                </option>

            `;

        });

        tbody.innerHTML += `

        <tr>

            <td>${usuario.nombre}</td>

            <td>${usuario.rol}</td>

            <td>

                <select id="sel_${usuario._id}">

                    ${opciones}

                </select>

            </td>

            <td>

                <button
                    onclick="guardar('${usuario._id}')">

                    Guardar

                </button>

            </td>

        </tr>

        `;

    });

}

async function guardar(idUsuario) {

    const personalId =

        document.getElementById(

            `sel_${idUsuario}`

        ).value;

    const res = await fetch(

        `/api/configuracion/vincular/${idUsuario}`,

        {

            method: 'PUT',

            headers: {

                'Content-Type':'application/json'

            },

            body: JSON.stringify({

                personalId

            })

        }

    );

    const data = await res.json();

    alert(data.mensaje);

}

cargarUsuarios();