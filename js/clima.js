// =========================================================
// ASISTENTE TÉRMICO KOMPUTRONIK
// API: Open-Meteo
// =========================================================


/* =========================================================
                ELEMENTOS DEL HTML
========================================================= */

const ciudadClima =
    document.getElementById("ciudadClima");

const btnBuscarClima =
    document.getElementById("btnBuscarClima");

const resultadoClima =
    document.getElementById("resultadoClima");

const mensajeErrorClima =
    document.getElementById("mensajeErrorClima");

const recomendacionTermica =
    document.getElementById("recomendacionTermica");

const tituloRecomendacion =
    document.getElementById("tituloRecomendacion");

const textoRecomendacion =
    document.getElementById("textoRecomendacion");

const accionEnfriamiento =
    document.getElementById("accionEnfriamiento");


/* =========================================================
                EVENTO DEL BOTÓN
========================================================= */

if (btnBuscarClima) {

    btnBuscarClima.addEventListener(
        "click",
        buscarClima
    );

}


/* =========================================================
                PERMITIR ENTER
========================================================= */

if (ciudadClima) {

    ciudadClima.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                buscarClima();

            }

        }
    );

}


/* =========================================================
                FUNCIÓN PRINCIPAL
========================================================= */

async function buscarClima() {

    /* Verificar elementos */

    if (!ciudadClima || !resultadoClima) {
        return;
    }


    /* Limpiar mensaje de error */

    if (mensajeErrorClima) {

        mensajeErrorClima.textContent = "";

    }


    /* Obtener ciudad */

    const ciudad =
        ciudadClima.value.trim();


    /* =====================================================
                    VALIDAR CIUDAD
    ===================================================== */

    if (ciudad === "") {

        if (mensajeErrorClima) {

            mensajeErrorClima.textContent =
                "⚠️ Ingresa el nombre de una ciudad.";

        }

        return;

    }


    /* =====================================================
                    MOSTRAR CARGANDO
    ===================================================== */

    resultadoClima.innerHTML = `

        <div class="clima-cargando">

            <p>
                🔄 Consultando temperatura de ${ciudad}...
            </p>

        </div>

    `;


    /* Ocultar recomendación mientras carga */

    if (recomendacionTermica) {

        recomendacionTermica.style.display = "none";

    }


    if (accionEnfriamiento) {

        accionEnfriamiento.style.display = "none";

    }


    try {


        /* =================================================
                1. BUSCAR CIUDAD
        ================================================= */

        const respuestaCiudad = await fetch(

            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(ciudad)}&count=1&language=es&format=json`

        );


        if (!respuestaCiudad.ok) {

            throw new Error(
                "No se pudo obtener la ubicación."
            );

        }


        const datosCiudad =
            await respuestaCiudad.json();


        /* =================================================
                VERIFICAR RESULTADO
        ================================================= */

        if (
            !datosCiudad.results ||
            datosCiudad.results.length === 0
        ) {

            throw new Error(
                "Ciudad no encontrada."
            );

        }


        /* =================================================
                    DATOS DE LA CIUDAD
        ================================================= */

        const ubicacion =
            datosCiudad.results[0];


        const latitud =
            ubicacion.latitude;


        const longitud =
            ubicacion.longitude;


        const nombreCiudad =
            ubicacion.name;


        const pais =
            ubicacion.country;


        /* =================================================
                    2. CONSULTAR CLIMA
        ================================================= */

        const respuestaClima = await fetch(

            `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`

        );


        if (!respuestaClima.ok) {

            throw new Error(
                "No se pudo obtener el clima."
            );

        }


        const datosClima =
            await respuestaClima.json();


        /* =================================================
                DATOS METEOROLÓGICOS
        ================================================= */

        const temperatura =
            datosClima.current.temperature_2m;


        const humedad =
            datosClima.current.relative_humidity_2m;


        const viento =
            datosClima.current.wind_speed_10m;


        const codigoClima =
            datosClima.current.weather_code;


        /* =================================================
                DESCRIPCIÓN DEL CLIMA
        ================================================= */

        const informacionClima =
            obtenerDescripcionClima(
                codigoClima
            );


        /* =================================================
                    MOSTRAR RESULTADO
        ================================================= */

        resultadoClima.innerHTML = `

            <div class="clima-info">

                <div class="clima-ciudad">

                    📍 ${nombreCiudad}, ${pais}

                </div>


                <div class="clima-icono">

                    ${informacionClima.icono}

                </div>


                <div class="clima-temperatura">

                    ${Math.round(temperatura)} °C

                </div>


                <div class="clima-descripcion">

                    ${informacionClima.descripcion}

                </div>


                <div class="clima-datos">

                    <div class="clima-dato">

                        <span>
                            💧 Humedad
                        </span>

                        <span>
                            ${humedad}%
                        </span>

                    </div>


                    <div class="clima-dato">

                        <span>
                            💨 Viento
                        </span>

                        <span>
                            ${viento} km/h
                        </span>

                    </div>

                </div>

            </div>

        `;


        /* =================================================
                ANALIZAR TEMPERATURA
        ================================================= */

        analizarTemperatura(
            temperatura
        );


    } catch (error) {


        /* =================================================
                    MANEJAR ERROR
        ================================================= */

        console.error(
            "Error al consultar clima:",
            error
        );


        resultadoClima.innerHTML = `

            <div class="clima-cargando">

                <p>
                    ❌ No se pudo obtener el clima.
                </p>

            </div>

        `;


        if (mensajeErrorClima) {

            mensajeErrorClima.textContent =
                "Verifica el nombre de la ciudad e inténtalo nuevamente.";

        }

    }

}


/* =========================================================
            ANALIZAR TEMPERATURA
========================================================= */

function analizarTemperatura(
    temperatura
) {

    /* Verificar elementos */

    if (!recomendacionTermica) {
        return;
    }


    /* Mostrar recomendación */

    recomendacionTermica.style.display =
        "flex";


    if (accionEnfriamiento) {

        accionEnfriamiento.style.display =
            "block";

    }


    /* =====================================================
                TEMPERATURA NORMAL
    ===================================================== */

    if (temperatura <= 25) {

        recomendacionTermica.className =
            "recomendacion-termica temperatura-normal";


        if (tituloRecomendacion) {

            tituloRecomendacion.textContent =
                "🟢 Condiciones favorables";

        }


        if (textoRecomendacion) {

            textoRecomendacion.textContent =
                "La temperatura ambiente es adecuada para el funcionamiento de tu equipo. Mantén una buena ventilación y realiza limpieza periódica de los componentes.";

        }


        return;

    }


    /* =====================================================
                TEMPERATURA MODERADA
    ===================================================== */

    if (temperatura <= 30) {

        recomendacionTermica.className =
            "recomendacion-termica temperatura-moderada";


        if (tituloRecomendacion) {

            tituloRecomendacion.textContent =
                "🟡 Temperatura moderada";

        }


        if (textoRecomendacion) {

            textoRecomendacion.textContent =
                "El ambiente comienza a ser más cálido. Para laptops y equipos gaming recomendamos mantener despejadas las entradas de aire y revisar periódicamente la ventilación.";

        }


        return;

    }


    /* =====================================================
                TEMPERATURA ALTA
    ===================================================== */

    if (temperatura <= 35) {

        recomendacionTermica.className =
            "recomendacion-termica temperatura-alta";


        if (tituloRecomendacion) {

            tituloRecomendacion.textContent =
                "🟠 Temperatura elevada";

        }


        if (textoRecomendacion) {

            textoRecomendacion.textContent =
                "El calor ambiental puede dificultar la disipación térmica. Considera utilizar una base refrigerante para laptops o mejorar el flujo de aire de tu PC.";

        }


        return;

    }


    /* =====================================================
                TEMPERATURA MUY ALTA
    ===================================================== */

    recomendacionTermica.className =
        "recomendacion-termica temperatura-muy-alta";


    if (tituloRecomendacion) {

        tituloRecomendacion.textContent =
            "🔴 Temperatura muy elevada";

    }


    if (textoRecomendacion) {

        textoRecomendacion.textContent =
            "Las altas temperaturas pueden aumentar el estrés térmico del equipo. Recomendamos reforzar la refrigeración mediante ventiladores, disipadores o sistemas de refrigeración adecuados.";

    }

}


/* =========================================================
                DESCRIPCIÓN DEL CLIMA
========================================================= */

function obtenerDescripcionClima(codigo) {

    switch (codigo) {


        /* CIELO DESPEJADO */

        case 0:

            return {

                descripcion: "Cielo despejado",

                icono: "☀️"

            };


        /* PARCIALMENTE NUBLADO */

        case 1:
        case 2:
        case 3:

            return {

                descripcion: "Parcialmente nublado",

                icono: "⛅"

            };


        /* NIEBLA */

        case 45:
        case 48:

            return {

                descripcion: "Niebla",

                icono: "🌫️"

            };


        /* LLOVIZNA */

        case 51:
        case 53:
        case 55:

            return {

                descripcion: "Llovizna",

                icono: "🌦️"

            };


        /* LLUVIA */

        case 61:
        case 63:
        case 65:

            return {

                descripcion: "Lluvia",

                icono: "🌧️"

            };


        /* NIEVE */

        case 71:
        case 73:
        case 75:

            return {

                descripcion: "Nieve",

                icono: "❄️"

            };


        /* CHUBASCOS */

        case 80:
        case 81:
        case 82:

            return {

                descripcion: "Chubascos",

                icono: "🌦️"

            };


        /* TORMENTA */

        case 95:

            return {

                descripcion: "Tormenta eléctrica",

                icono: "⛈️"

            };


        /* TORMENTA CON GRANIZO */

        case 96:
        case 99:

            return {

                descripcion: "Tormenta con granizo",

                icono: "⛈️"

            };


        /* DESCONOCIDO */

        default:

            return {

                descripcion: "Condiciones desconocidas",

                icono: "🌤️"

            };

    }

}