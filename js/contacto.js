// =========================================================
// FORMULARIO DE CONTACTO - KOMPUTRONIK
// =========================================================

const formContacto =
    document.getElementById("formContacto");


formContacto.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        validarFormulario();

    }
);


// =========================================================
// FUNCIÓN PRINCIPAL
// =========================================================

function validarFormulario() {

    // Obtener valores

    const nombre =
        document.getElementById("nombre").value.trim();

    const correo =
        document.getElementById("correo").value.trim();

    const telefono =
        document.getElementById("telefono").value.trim();

    const asunto =
        document.getElementById("asunto").value;

    const mensaje =
        document.getElementById("mensaje").value.trim();


    // Limpiar errores

    document.getElementById("errorNombre").textContent = "";
    document.getElementById("errorCorreo").textContent = "";
    document.getElementById("errorTelefono").textContent = "";
    document.getElementById("errorAsunto").textContent = "";
    document.getElementById("errorMensaje").textContent = "";

    document.getElementById("mensajeExito").textContent = "";


    let formularioValido = true;


    // =====================================================
    // VALIDAR NOMBRE
    // =====================================================

    if (nombre === "") {

        document.getElementById("errorNombre").textContent =
            "⚠️ Ingresa tu nombre.";

        formularioValido = false;

    } else if (nombre.length < 3) {

        document.getElementById("errorNombre").textContent =
            "⚠️ El nombre debe tener al menos 3 caracteres.";

        formularioValido = false;
    }


    // =====================================================
    // VALIDAR CORREO
    // =====================================================

    const patronCorreo =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (correo === "") {

        document.getElementById("errorCorreo").textContent =
            "⚠️ Ingresa tu correo.";

        formularioValido = false;

    } else if (!patronCorreo.test(correo)) {

        document.getElementById("errorCorreo").textContent =
            "⚠️ Ingresa un correo válido.";

        formularioValido = false;
    }


    // =====================================================
    // VALIDAR TELÉFONO
    // =====================================================

    const patronTelefono =
        /^[0-9]{9}$/;


    if (telefono === "") {

        document.getElementById("errorTelefono").textContent =
            "⚠️ Ingresa tu teléfono.";

        formularioValido = false;

    } else if (!patronTelefono.test(telefono)) {

        document.getElementById("errorTelefono").textContent =
            "⚠️ El teléfono debe tener 9 números.";

        formularioValido = false;
    }


    // =====================================================
    // VALIDAR ASUNTO
    // =====================================================

    if (asunto === "") {

        document.getElementById("errorAsunto").textContent =
            "⚠️ Selecciona un asunto.";

        formularioValido = false;
    }


    // =====================================================
    // VALIDAR MENSAJE
    // =====================================================

    if (mensaje === "") {

        document.getElementById("errorMensaje").textContent =
            "⚠️ Escribe un mensaje.";

        formularioValido = false;

    } else if (mensaje.length < 10) {

        document.getElementById("errorMensaje").textContent =
            "⚠️ El mensaje debe tener al menos 10 caracteres.";

        formularioValido = false;
    }


    // =====================================================
    // RESULTADO
    // =====================================================

    if (formularioValido) {

        document.getElementById("mensajeExito").innerHTML =
            "✅ ¡Mensaje enviado correctamente!";

        formContacto.reset();

    }

}