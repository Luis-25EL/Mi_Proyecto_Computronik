// =========================================================
// RELOJ DIGITAL - KOMPUTRONIK
// =========================================================

function actualizarReloj() {

    const ahora = new Date();

    // Obtener hora
    const horas = String(
        ahora.getHours()
    ).padStart(2, "0");

    const minutos = String(
        ahora.getMinutes()
    ).padStart(2, "0");

    const segundos = String(
        ahora.getSeconds()
    ).padStart(2, "0");


    // Mostrar hora
    document.getElementById("relojDigital").textContent =
        `${horas}:${minutos}:${segundos}`;


    // Obtener fecha
    const fecha = ahora.toLocaleDateString(
        "es-PE",
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );


    // Mostrar fecha
    document.getElementById("fechaActual").textContent =
        fecha;
}


// Ejecutar inmediatamente
actualizarReloj();


// Actualizar cada segundo
setInterval(
    actualizarReloj,
    1000
);