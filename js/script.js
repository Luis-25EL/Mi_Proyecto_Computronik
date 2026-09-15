




/*=========================================================
                    CARRUSEL KOMPUTRONIK
=========================================================*/

// Obtener los slides
const slides = document.querySelectorAll(".slide");

// Obtener los indicadores
const indicadores = document.querySelectorAll(".indicador");

// Obtener botones
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

// Posición actual
let slideActual = 0;


/*=========================================================
                MOSTRAR SLIDE
=========================================================*/

function mostrarSlide(numero) {

    // Verificar que existan slides
    if (slides.length === 0) {
        return;
    }

    // Quitar clase activo a todos
    slides.forEach(slide => {
        slide.classList.remove("activo");
    });

    indicadores.forEach(indicador => {
        indicador.classList.remove("activo");
    });

    // Agregar activo al slide seleccionado
    if (slides[numero]) {
        slides[numero].classList.add("activo");
    }

    if (indicadores[numero]) {
        indicadores[numero].classList.add("activo");
    }

    // Actualizar posición
    slideActual = numero;
}


/*=========================================================
                    SIGUIENTE
=========================================================*/

function siguienteSlide() {

    // Si no hay slides, no hacer nada
    if (slides.length === 0) {
        return;
    }

    slideActual++;

    if (slideActual >= slides.length) {
        slideActual = 0;
    }

    mostrarSlide(slideActual);
}


/*=========================================================
                    ANTERIOR
=========================================================*/

function anteriorSlide() {

    // Si no hay slides, no hacer nada
    if (slides.length === 0) {
        return;
    }

    slideActual--;

    if (slideActual < 0) {
        slideActual = slides.length - 1;
    }

    mostrarSlide(slideActual);
}


/*=========================================================
                    EVENTOS
=========================================================*/

// Botón siguiente
if (btnSiguiente) {
    btnSiguiente.addEventListener("click", siguienteSlide);
}

// Botón anterior
if (btnAnterior) {
    btnAnterior.addEventListener("click", anteriorSlide);
}


/*=========================================================
                    INDICADORES
=========================================================*/

indicadores.forEach((indicador, posicion) => {

    indicador.addEventListener("click", () => {
        mostrarSlide(posicion);
    });

});


/*=========================================================
                CAMBIO AUTOMÁTICO
=========================================================*/

if (slides.length > 0) {

    setInterval(() => {
        siguienteSlide();
    }, 5000);

}


/*=========================================================
                    BUSCADOR KOMPUTRONIK
=========================================================*/

// Obtener elementos del buscador
const buscadorProductos =
    document.getElementById("buscadorProductos");

const btnBuscar =
    document.getElementById("btnBuscar");

// Obtener todas las tarjetas de productos
// Funciona para productos normales y productos de ofertas
const productos = document.querySelectorAll(
    ".producto-card, .card-producto"
);


function buscarProductos() {

    if (!buscadorProductos) {
        return;
    }

    const textoBusqueda =
        buscadorProductos.value
            .toLowerCase()
            .trim();

    let encontrados = 0;

    productos.forEach(producto => {

        const elementoNombre =
            producto.querySelector("h3");

        const elementoCategoria =
            producto.querySelector(
                ".producto-categoria, .marca"
            );

        const elementoDescripcion =
            producto.querySelector(
                ".producto-descripcion"
            );

        const nombreData =
            producto.dataset.nombre
                ? producto.dataset.nombre.toLowerCase()
                : "";

        const categoriaData =
            producto.dataset.categoria
                ? producto.dataset.categoria.toLowerCase()
                : "";

        const nombre =
            elementoNombre
                ? elementoNombre.textContent.toLowerCase()
                : "";

        const categoria =
            elementoCategoria
                ? elementoCategoria.textContent.toLowerCase()
                : "";

        const descripcion =
            elementoDescripcion
                ? elementoDescripcion.textContent.toLowerCase()
                : "";

        const coincide =
            textoBusqueda === "" ||
            nombre.includes(textoBusqueda) ||
            categoria.includes(textoBusqueda) ||
            descripcion.includes(textoBusqueda) ||
            nombreData.includes(textoBusqueda) ||
            categoriaData.includes(textoBusqueda);

        if (coincide) {

            producto.style.display = "";

            encontrados++;

        } else {

            producto.style.display = "none";

        }

    });


    // ==========================================
    // MENSAJE CUANDO NO HAY RESULTADOS
    // ==========================================

    const sinResultados =
        document.getElementById("sinResultados");

    if (sinResultados) {

        if (
            textoBusqueda !== "" &&
            encontrados === 0
        ) {

            sinResultados.style.display = "block";

        } else {

            sinResultados.style.display = "none";

        }

    }

}
/*=========================================================
                EVENTO DEL BUSCADOR
=========================================================*/

// Botón buscar
if (btnBuscar) {

    btnBuscar.addEventListener(
        "click",
        buscarProductos
    );

}


// Buscar mientras escribe
if (buscadorProductos) {

    buscadorProductos.addEventListener(
        "input",
        buscarProductos
    );

    buscadorProductos.addEventListener(
        "keydown",
        function (evento) {

            if (evento.key === "Enter") {

                evento.preventDefault();
                buscarProductos();

            }

        }
    );
}
/*=========================================================
              MENÚ ACTIVO KOMPUTRONIK
=========================================================*/

document.addEventListener("DOMContentLoaded", function () {

    // Obtener enlaces del menú
    const enlacesMenu = document.querySelectorAll(".nav-links a");

    // Si no existe el menú, no hacer nada
    if (enlacesMenu.length === 0) {
        return;
    }

    // Obtener la página actual
    let paginaActual = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    // Si estamos en la raíz del proyecto
    if (paginaActual === "") {
        paginaActual = "index.html";
    }

    // Revisar cada enlace
    enlacesMenu.forEach(enlace => {

        const href = enlace.getAttribute("href");

        // Si no tiene href, ignorarlo
        if (!href) {
            return;
        }

        // Obtener página del enlace
        let paginaEnlace = href
            .split("/")
            .pop()
            .toLowerCase();

        // Quitar activo
        enlace.classList.remove("nav-activo");

        // Comparar página actual con enlace
        if (paginaActual === paginaEnlace) {

            enlace.classList.add("nav-activo");

        }

    });

});


/*=========================================================
                FIN JAVASCRIPT KOMPUTRONIK
=========================================================*/
/* =========================================================
                MENÚ HAMBURGUESA
========================================================= */

const btnMenu = document.getElementById("btnMenu");
const navLinks = document.querySelector(".nav-links");

if (btnMenu && navLinks) {

    btnMenu.addEventListener("click", function () {

        navLinks.classList.toggle("menu-abierto");

        btnMenu.classList.toggle("activo");

    });


    /* Cerrar menú al seleccionar una opción */

    navLinks.querySelectorAll("a").forEach(function (enlace) {

        enlace.addEventListener("click", function () {

            navLinks.classList.remove("menu-abierto");

            btnMenu.classList.remove("activo");

        });

    });

}