
/*=========================================================
                CARRITO DE COMPRAS
                    KOMPUTRONIK
=========================================================*/


//=========================================================
// OBTENER CARRITO
//=========================================================

let carrito =
    JSON.parse(localStorage.getItem("carrito")) || [];


//=========================================================
// GUARDAR CARRITO
//=========================================================

function guardarCarrito() {

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

}


//=========================================================
// FORMATEAR PRECIO
//=========================================================

function formatoPrecio(precio) {

    return "S/ " +
        precio.toLocaleString("es-PE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

}


//=========================================================
// ACTUALIZAR CONTADOR
//=========================================================

function actualizarContador() {

    const contador =
        document.getElementById("contadorCarrito");


    if (!contador) return;


    const cantidad =
        carrito.reduce(
            (total, producto) =>
                total + producto.cantidad,
            0
        );


    contador.textContent = cantidad;

}


//=========================================================
// MOSTRAR CARRITO
//=========================================================

function mostrarCarrito() {

    const lista =
        document.getElementById("listaCarrito");


    const carritoVacio =
        document.getElementById("carritoVacio");


    const cantidadProductos =
        document.getElementById("cantidadProductos");


    if (!lista) return;


    lista.innerHTML = "";


    //-----------------------------------------------------
    // CARRITO VACÍO
    //-----------------------------------------------------

    if (carrito.length === 0) {

        carritoVacio.style.display = "block";

        if (cantidadProductos) {

            cantidadProductos.textContent =
                "0 productos";

        }

        actualizarResumen();

        return;

    }


    carritoVacio.style.display = "none";


    //-----------------------------------------------------
    // CANTIDAD TOTAL
    //-----------------------------------------------------

    const cantidadTotal =
        carrito.reduce(
            (total, producto) =>
                total + producto.cantidad,
            0
        );


    if (cantidadProductos) {

        cantidadProductos.textContent =
            cantidadTotal +
            (cantidadTotal === 1
                ? " producto"
                : " productos");

    }


    //-----------------------------------------------------
    // CREAR PRODUCTOS
    //-----------------------------------------------------

    carrito.forEach(producto => {


        const item =
            document.createElement("article");


        item.className =
            "item-carrito";


        item.innerHTML = `

            <div class="item-imagen">

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                >

            </div>


            <div class="item-info">

                <h3>
                    ${producto.nombre}
                </h3>

                <span class="item-precio">
                    ${formatoPrecio(producto.precio)}
                </span>


                <div class="item-controles">

                    <button
                        class="btn-cantidad"
                        onclick="disminuirCantidad('${producto.id}')">

                        −

                    </button>


                    <span class="cantidad">
                        ${producto.cantidad}
                    </span>


                    <button
                        class="btn-cantidad"
                        onclick="aumentarCantidad('${producto.id}')">

                        +

                    </button>

                </div>

            </div>


            <div class="item-total">

                <strong>
                    ${formatoPrecio(
                        producto.precio *
                        producto.cantidad
                    )}
                </strong>


                <button
                    class="btn-eliminar"
                    onclick="eliminarProducto('${producto.id}')">

                    <i class="fa-solid fa-trash"></i>

                    Eliminar

                </button>

            </div>

        `;


        lista.appendChild(item);

    });


    actualizarResumen();

}


//=========================================================
// AUMENTAR CANTIDAD
//=========================================================
function aumentarCantidad(id) {

    const producto =
        carrito.find(
            producto => String(producto.id) === String(id)
        );

    if (!producto) return;

    producto.cantidad++;

    guardarCarrito();

    mostrarCarrito();

    actualizarContador();
}


//=========================================================
// DISMINUIR CANTIDAD
//=========================================================


function disminuirCantidad(id) {

    const producto =
        carrito.find(
            producto => String(producto.id) === String(id)
        );

    if (!producto) return;

    if (producto.cantidad > 1) {

        producto.cantidad--;

    } else {

        eliminarProducto(id);

        return;
    }

    guardarCarrito();

    mostrarCarrito();

    actualizarContador();
}


//=========================================================
// ELIMINAR PRODUCTO
//=========================================================
function eliminarProducto(id) {

    carrito =
        carrito.filter(
            producto => String(producto.id) !== String(id)
        );

    guardarCarrito();

    mostrarCarrito();

    actualizarContador();
}


//=========================================================
// ACTUALIZAR RESUMEN
//=========================================================

function actualizarResumen() {

    const subtotalElemento =
        document.getElementById("subtotal");


    const totalElemento =
        document.getElementById("total");


    if (!subtotalElemento ||
        !totalElemento) {

        return;

    }


    const subtotal =
        carrito.reduce(
            (total, producto) =>
                total +
                (
                    producto.precio *
                    producto.cantidad
                ),
            0
        );


    const envio = 0;


    const total =
        subtotal + envio;


    subtotalElemento.textContent =
        formatoPrecio(subtotal);


    totalElemento.textContent =
        formatoPrecio(total);

}


//=========================================================
// AGREGAR PRODUCTOS DESDE INDEX
//=========================================================

function configurarBotonesAgregar() {

    const botones =
        document.querySelectorAll(
            ".btn-agregar"
        );


    botones.forEach(boton => {


        boton.addEventListener(
            "click",
            function () {


                const producto = {

                    id:
                        this.dataset.id,

                    nombre:
                        this.dataset.nombre,

                    precio:
                        Number(
                            this.dataset.precio
                        ),

                    imagen:
                        this.dataset.imagen,

                    cantidad: 1

                };


                const existente =
                    carrito.find(
                        item =>
                            item.id === producto.id
                    );


                if (existente) {

                    existente.cantidad++;

                } else {

                    carrito.push(producto);

                }


                guardarCarrito();

                actualizarContador();


                mostrarMensaje(
                    "✓ Producto agregado al carrito"
                );

            }
        );

    });

}


//=========================================================
// MENSAJE
//=========================================================

function mostrarMensaje(texto) {

    const mensaje =
        document.createElement("div");


    mensaje.className =
        "mensaje-carrito";


    mensaje.textContent =
        texto;


    document.body.appendChild(mensaje);


    setTimeout(() => {

        mensaje.remove();

    }, 2000);

}


//=========================================================
// BOTÓN PROCEDER AL PAGO
//=========================================================

function configurarPago() {

    const boton =
        document.getElementById("btnPagar");


    if (!boton) return;


    boton.addEventListener(
        "click",
        function () {


            if (carrito.length === 0) {

                alert(
                    "Tu carrito está vacío."
                );

                return;

            }


            /*
             * POR AHORA MOSTRAMOS UN MENSAJE.
             *
             * MÁS ADELANTE AQUÍ
             * INTEGRAREMOS LA PASARELA
             * DE PAGO REAL.
             */


            alert(
                window.location.href = "checkout.html"
            );

        }
    );

}


//=========================================================
// INICIAR
//=========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        configurarBotonesAgregar();


        mostrarCarrito();


        actualizarContador();


        configurarPago();

    }
);

