// =========================================================
// MODO OSCURO / CLARO - KOMPUTRONIK
// =========================================================

// Obtener botón
const btnTema = document.getElementById("btnTema");


// =========================================================
// VERIFICAR QUE EL BOTÓN EXISTA
// =========================================================

if (btnTema) {

    // =====================================================
    // CARGAR TEMA GUARDADO
    // =====================================================

    const temaGuardado = localStorage.getItem("tema");


    if (temaGuardado === "oscuro") {

        document.body.classList.add("modo-oscuro");

        btnTema.textContent = "☀️";

    } else {

        document.body.classList.remove("modo-oscuro");

        btnTema.textContent = "🌙";

    }


    // =====================================================
    // CAMBIAR TEMA
    // =====================================================

    btnTema.addEventListener("click", function () {

        document.body.classList.toggle("modo-oscuro");


        // =================================================
        // COMPROBAR TEMA ACTUAL
        // =================================================

        const modoOscuro =
            document.body.classList.contains("modo-oscuro");


        // =================================================
        // CAMBIAR ICONO
        // =================================================

        if (modoOscuro) {

            btnTema.textContent = "☀️";

        } else {

            btnTema.textContent = "🌙";

        }


        // =================================================
        // GUARDAR PREFERENCIA
        // =================================================

        localStorage.setItem(
            "tema",
            modoOscuro ? "oscuro" : "claro"
        );

    });

}