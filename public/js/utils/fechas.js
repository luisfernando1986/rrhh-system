// ======================================
// UTILIDAD DE FECHAS
// ======================================

function calcularDias(inicio, fin) {
    const fechaInicio = new Date(inicio);
    const fechaFin = new Date(fin);

    const diferencia = fechaFin - fechaInicio;

    return Math.floor(diferencia / (1000 * 60 * 60 * 24)) + 1;
}