// =========================================================
// CALCULADORA DE EDAD - KOMPUTRONIK
// =========================================================

const fechaNacimiento =
    document.getElementById("fechaNacimiento");

const btnCalcularEdad =
    document.getElementById("btnCalcularEdad");

const resultadoEdad =
    document.getElementById("resultadoEdad");

const mensajeErrorEdad =
    document.getElementById("mensajeErrorEdad");


// =========================================================
// EVENTO
// =========================================================

btnCalcularEdad.addEventListener(
    "click",
    calcularEdad
);


// =========================================================
// FUNCIÓN CALCULAR EDAD
// =========================================================

function calcularEdad() {

    // Limpiar mensaje anterior
    mensajeErrorEdad.textContent = "";


    // Obtener fecha
    const fechaNacimientoValor =
        fechaNacimiento.value;


    // =====================================================
    // VALIDAR FECHA
    // =====================================================

    if (fechaNacimientoValor === "") {

        mensajeErrorEdad.textContent =
            "⚠️ Selecciona tu fecha de nacimiento.";

        return;
    }


    // Convertir fecha
    const nacimiento =
        new Date(fechaNacimientoValor + "T00:00:00");


    const hoy = new Date();


    // =====================================================
    // VALIDAR FECHA FUTURA
    // =====================================================

    if (nacimiento > hoy) {

        mensajeErrorEdad.textContent =
            "⚠️ La fecha de nacimiento no puede ser futura.";

        return;
    }


    // =====================================================
    // CALCULAR AÑOS
    // =====================================================

    let años =
        hoy.getFullYear() -
        nacimiento.getFullYear();


    // =====================================================
    // CALCULAR MESES
    // =====================================================

    let meses =
        hoy.getMonth() -
        nacimiento.getMonth();


    // =====================================================
    // CALCULAR DÍAS
    // =====================================================

    let dias =
        hoy.getDate() -
        nacimiento.getDate();


    // =====================================================
    // AJUSTAR DÍAS
    // =====================================================

    if (dias < 0) {

        meses--;

        const ultimoDiaMesAnterior =
            new Date(
                hoy.getFullYear(),
                hoy.getMonth(),
                0
            ).getDate();

        dias +=
            ultimoDiaMesAnterior;
    }


    // =====================================================
    // AJUSTAR MESES
    // =====================================================

    if (meses < 0) {

        años--;

        meses += 12;
    }


    // =====================================================
    // MOSTRAR RESULTADO
    // =====================================================

    resultadoEdad.innerHTML = `

        <strong>
            🎉 Tienes:
        </strong>

        <br><br>

        <span class="edad-numero">
            ${años}
        </span>
        años,

        <span class="edad-numero">
            ${meses}
        </span>
        meses y

        <span class="edad-numero">
            ${dias}
        </span>
        días.

    `;

}