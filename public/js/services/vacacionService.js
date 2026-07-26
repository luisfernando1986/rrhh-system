// ======================================
// SERVICIO DE VACACIONES
// ======================================

// ======================================
// OBTENER UNA VACACIÓN POR ID
// ======================================

async function obtenerVacacionPorId(id) {

    return await get(

        `/vacaciones/${id}`

    );

}

// ======================================
// ACTUALIZAR VACACIÓN
// ======================================

async function actualizarVacacion(id, data) {

    return await put(

        `/vacaciones/${id}`,

        data

    );

}

// ======================================
// LISTAR VACACIONES
// ======================================

async function listarVacaciones() {

    return await get(

        `/vacaciones`

    );

}