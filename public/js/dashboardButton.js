console.log('DashboardButton cargado');

document.addEventListener('DOMContentLoaded', () => {

    const boton = document.createElement('a');

    boton.href = '/dashboard';

    boton.innerHTML = '🏠 Dashboard';

    boton.style.position = 'fixed';
    boton.style.top = '15px';
    boton.style.left = '15px';
    boton.style.padding = '10px';
    boton.style.background = '#0d6efd';
    boton.style.color = 'white';
    boton.style.textDecoration = 'none';
    boton.style.borderRadius = '6px';
    boton.style.zIndex = '9999';

    document.body.appendChild(boton);

});