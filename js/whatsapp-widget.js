/* =========================================================
   WIDGET WHATSAPP FLOTANTE CON MENÚ DE CONTACTOS
========================================================= */

document.addEventListener('DOMContentLoaded', function () {

    const boton = document.getElementById('whatsappToggle');
    const popup = document.getElementById('whatsappPopup');
    if (!boton || !popup) return;

    function abrir() {
        popup.classList.add('activo');
    }

    function cerrar() {
        popup.classList.remove('activo');
    }

    function alternar(e) {
        e.stopPropagation();
        popup.classList.contains('activo') ? cerrar() : abrir();
    }

    boton.addEventListener('click', alternar);

    // Cierra al hacer clic fuera del widget
    document.addEventListener('click', function (e) {
        if (!popup.contains(e.target) && !boton.contains(e.target)) {
            cerrar();
        }
    });

    // Cierra con la tecla Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') cerrar();
    });
});
