// =========================================================
// FORMULARIO DE INICIO DE SESIÓN - KOMPUTRONIK
// =========================================================

const formLogin =
    document.getElementById("formLogin");


// =========================================================
// MOSTRAR / OCULTAR CONTRASEÑA
// =========================================================

const btnTogglePass =
    document.getElementById("btnTogglePass");

const campoPassword =
    document.getElementById("password");


if (btnTogglePass && campoPassword) {

    btnTogglePass.addEventListener("click", function () {

        const esPassword =
            campoPassword.type === "password";

        campoPassword.type =
            esPassword ? "text" : "password";

        btnTogglePass.innerHTML =
            esPassword
                ? '<i class="fa-solid fa-eye-slash"></i>'
                : '<i class="fa-solid fa-eye"></i>';

    });

}


// =========================================================
// ENVÍO DEL FORMULARIO
// =========================================================

if (formLogin) {

    formLogin.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            validarLogin();

        }
    );

}


// =========================================================
// FUNCIÓN PRINCIPAL DE VALIDACIÓN
// =========================================================

function validarLogin() {

    // Obtener valores

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;


    // Limpiar mensajes previos

    document.getElementById("errorEmail").textContent = "";
    document.getElementById("errorPassword").textContent = "";

    const mensaje =
        document.getElementById("authMensaje");

    mensaje.textContent = "";
    mensaje.className = "auth-mensaje";


    let formularioValido = true;


    // =====================================================
    // VALIDAR EMAIL
    // =====================================================

    const patronCorreo =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (email === "") {

        document.getElementById("errorEmail").textContent =
            "⚠️ Ingresa tu correo.";

        formularioValido = false;

    } else if (!patronCorreo.test(email)) {

        document.getElementById("errorEmail").textContent =
            "⚠️ Ingresa un correo válido.";

        formularioValido = false;
    }


    // =====================================================
    // VALIDAR CONTRASEÑA
    // =====================================================

    if (password === "") {

        document.getElementById("errorPassword").textContent =
            "⚠️ Ingresa tu contraseña.";

        formularioValido = false;

    } else if (password.length < 6) {

        document.getElementById("errorPassword").textContent =
            "⚠️ La contraseña debe tener al menos 6 caracteres.";

        formularioValido = false;
    }


    // =====================================================
    // RESULTADO
    // =====================================================

    if (!formularioValido) {
        return;
    }


    // Buscar cuenta registrada localmente

    const usuarios =
        JSON.parse(localStorage.getItem("usuariosKomputronik")) || [];

    const cuenta =
        usuarios.find(
            usuario =>
                usuario.email.toLowerCase() === email.toLowerCase()
        );


    if (!cuenta || cuenta.password !== password) {

        mensaje.textContent =
            "❌ Correo o contraseña incorrectos.";

        mensaje.classList.add("error");

        return;
    }


    // Guardar sesión activa

    localStorage.setItem(
        "usuarioActivo",
        JSON.stringify({
            nombre: cuenta.nombre,
            email: cuenta.email
        })
    );


    mensaje.textContent =
        "✅ ¡Bienvenido " + cuenta.nombre + "! Redirigiendo...";

    mensaje.classList.add("exito");


    setTimeout(function () {

        window.location.href = "index.html";

    }, 1200);

}
