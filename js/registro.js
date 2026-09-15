// =========================================================
// FORMULARIO DE REGISTRO - KOMPUTRONIK
// =========================================================

const formRegistro =
    document.getElementById("formRegistro");


if (formRegistro) {

    formRegistro.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            validarRegistro();

        }
    );

}


// =========================================================
// FUNCIÓN PRINCIPAL DE VALIDACIÓN
// =========================================================

function validarRegistro() {

    // Obtener valores

    const nombre =
        document.getElementById("nombre").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    const password2 =
        document.getElementById("password2").value;


    // Limpiar mensajes previos

    document.getElementById("errorNombre").textContent = "";
    document.getElementById("errorEmail").textContent = "";
    document.getElementById("errorPassword").textContent = "";
    document.getElementById("errorPassword2").textContent = "";

    const mensaje =
        document.getElementById("authMensaje");

    mensaje.textContent = "";
    mensaje.className = "auth-mensaje";


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
    // VALIDAR EMAIL
    // =====================================================

    const patronCorreo =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const usuarios =
        JSON.parse(localStorage.getItem("usuariosKomputronik")) || [];


    if (email === "") {

        document.getElementById("errorEmail").textContent =
            "⚠️ Ingresa tu correo.";

        formularioValido = false;

    } else if (!patronCorreo.test(email)) {

        document.getElementById("errorEmail").textContent =
            "⚠️ Ingresa un correo válido.";

        formularioValido = false;

    } else if (usuarios.some(
        usuario => usuario.email.toLowerCase() === email.toLowerCase()
    )) {

        document.getElementById("errorEmail").textContent =
            "⚠️ Ya existe una cuenta con ese correo.";

        formularioValido = false;
    }


    // =====================================================
    // VALIDAR CONTRASEÑA
    // =====================================================

    if (password === "") {

        document.getElementById("errorPassword").textContent =
            "⚠️ Ingresa una contraseña.";

        formularioValido = false;

    } else if (password.length < 6) {

        document.getElementById("errorPassword").textContent =
            "⚠️ La contraseña debe tener al menos 6 caracteres.";

        formularioValido = false;
    }


    // =====================================================
    // VALIDAR CONFIRMACIÓN
    // =====================================================

    if (password2 === "") {

        document.getElementById("errorPassword2").textContent =
            "⚠️ Confirma tu contraseña.";

        formularioValido = false;

    } else if (password2 !== password) {

        document.getElementById("errorPassword2").textContent =
            "⚠️ Las contraseñas no coinciden.";

        formularioValido = false;
    }


    // =====================================================
    // RESULTADO
    // =====================================================

    if (!formularioValido) {
        return;
    }


    usuarios.push({
        nombre: nombre,
        email: email,
        password: password
    });

    localStorage.setItem(
        "usuariosKomputronik",
        JSON.stringify(usuarios)
    );


    mensaje.textContent =
        "✅ ¡Cuenta creada con éxito! Redirigiendo a iniciar sesión...";

    mensaje.classList.add("exito");

    formRegistro.reset();


    setTimeout(function () {

        window.location.href = "login.html";

    }, 1400);

}
