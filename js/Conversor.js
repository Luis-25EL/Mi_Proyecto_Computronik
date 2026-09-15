// =========================================================
// CONVERSOR DE MONEDAS - KOMPUTRONIK
// =========================================================

// Obtener elementos del HTML
const monto = document.getElementById("monto");
const monedaOrigen = document.getElementById("monedaOrigen");
const monedaDestino = document.getElementById("monedaDestino");
const btnConvertir = document.getElementById("btnConvertir");
const resultadoConversion = document.getElementById("resultadoConversion");
const mensajeError = document.getElementById("mensajeError");


// =========================================================
// EVENTO DEL BOTÓN
// =========================================================

btnConvertir.addEventListener("click", convertirMoneda);


// =========================================================
// FUNCIÓN PRINCIPAL
// =========================================================

async function convertirMoneda() {

    // Limpiar mensaje de error
    mensajeError.textContent = "";

    // Obtener datos del formulario
    const cantidad = parseFloat(monto.value);
    const origen = monedaOrigen.value;
    const destino = monedaDestino.value;


    // =====================================================
    // VALIDAR MONTO
    // =====================================================

    if (isNaN(cantidad) || cantidad <= 0) {

        mensajeError.textContent =
            "⚠️ Ingresa un monto válido mayor que 0.";

        resultadoConversion.innerHTML = `
            <p>Esperando una cantidad para convertir...</p>
        `;

        return;
    }


    // =====================================================
    // MOSTRAR MENSAJE DE CARGA
    // =====================================================

    resultadoConversion.innerHTML = `
        <p>🔄 Consultando tasa de cambio...</p>
    `;


    try {

        // =================================================
        // LLAMADA A LA API
        // =================================================

        const respuesta = await fetch(
            `https://open.er-api.com/v6/latest/${origen}`
        );


        // Verificar respuesta
        if (!respuesta.ok) {

            throw new Error(
                "No se pudo conectar con el servidor."
            );

        }


        // =================================================
        // CONVERTIR RESPUESTA A JSON
        // =================================================

        const datos = await respuesta.json();


        // =================================================
        // OBTENER TASA DE CAMBIO
        // =================================================

        const tasa = datos.rates[destino];


        if (!tasa) {

            throw new Error(
                "No se encontró la tasa de cambio."
            );

        }


        // =================================================
        // REALIZAR CONVERSIÓN
        // =================================================

        const resultado = cantidad * tasa;


        // =================================================
        // MOSTRAR RESULTADO
        // =================================================

        resultadoConversion.innerHTML = `

            <div>

                <p>
                    <strong>
                        ${cantidad.toFixed(2)} ${origen}
                    </strong>

                    equivale a

                    <strong>
                        ${resultado.toFixed(2)} ${destino}
                    </strong>
                </p>

                <small>
                    1 ${origen} = ${tasa.toFixed(4)} ${destino}
                </small>

            </div>

        `;

    } catch (error) {

        // =================================================
        // MANEJAR ERROR
        // =================================================

        console.error(
            "Error en el conversor:",
            error
        );

        resultadoConversion.innerHTML = `
            <p>
                ❌ No se pudo realizar la conversión.
            </p>
        `;

        mensajeError.textContent =
            "Verifica tu conexión a Internet e inténtalo nuevamente.";

    }

}