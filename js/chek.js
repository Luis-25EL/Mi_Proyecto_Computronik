
/*=========================================================
                    CHECKOUT
                    KOMPUTRONIK
=========================================================*/


//=========================================================
// OBTENER CARRITO
//=========================================================

const carrito =
    JSON.parse(localStorage.getItem("carrito")) || [];


//=========================================================
// FORMATO DE PRECIO
//=========================================================

function formatoPrecio(precio) {

    return "S/ " +
        precio.toLocaleString("es-PE", {

            minimumFractionDigits: 2,

            maximumFractionDigits: 2

        });

}


//=========================================================
// MOSTRAR PRODUCTOS
//=========================================================

function mostrarProductosCheckout() {

    const contenedor =
        document.getElementById(
            "checkoutProductos"
        );


    if (!contenedor) return;


    contenedor.innerHTML = "";


    carrito.forEach(producto => {

        const item =
            document.createElement("div");


        item.className =
            "checkout-producto";


        item.innerHTML = `

            <img
                src="${producto.imagen}"
                alt="${producto.nombre}"
            >


            <div class="checkout-producto-info">

                <strong>
                    ${producto.nombre}
                </strong>

                <span>
                    Cantidad: ${producto.cantidad}
                </span>

            </div>


            <span class="checkout-producto-precio">

                ${formatoPrecio(
                    producto.precio *
                    producto.cantidad
                )}

            </span>

        `;


        contenedor.appendChild(item);

    });

}


//=========================================================
// CALCULAR TOTAL
//=========================================================

function actualizarTotal() {

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


    const subtotalElemento =
        document.getElementById(
            "checkoutSubtotal"
        );


    const totalElemento =
        document.getElementById(
            "checkoutTotal"
        );


    if (subtotalElemento) {

        subtotalElemento.textContent =
            formatoPrecio(subtotal);

    }


    if (totalElemento) {

        totalElemento.textContent =
            formatoPrecio(subtotal);

    }

}


//=========================================================
// CONTADOR
//=========================================================

function actualizarContador() {

    const contador =
        document.getElementById(
            "contadorCarrito"
        );


    if (!contador) return;


    const cantidad =
        carrito.reduce(

            (total, producto) =>
                total + producto.cantidad,

            0

        );


    contador.textContent =
        cantidad;

}


//=========================================================
// MOSTRAR / OCULTAR TARJETA
//=========================================================

function configurarMetodosPago() {

    const metodos =
        document.querySelectorAll(
            'input[name="metodoPago"]'
        );


    const datosTarjeta =
        document.getElementById(
            "datosTarjeta"
        );


    metodos.forEach(metodo => {

        metodo.addEventListener(
            "change",
            function () {

                if (
                    this.value === "tarjeta"
                ) {

                    datosTarjeta.style.display =
                        "block";

                } else {

                    datosTarjeta.style.display =
                        "none";

                }

            }
        );

    });

}


//=========================================================
// CONFIRMAR COMPRA
//=========================================================

function configurarCompra() {

    const boton =
        document.getElementById(
            "btnConfirmarCompra"
        );


    if (!boton) return;


    boton.addEventListener(
        "click",
        function () {


            // VALIDAR CARRITO

            if (carrito.length === 0) {

                alert(
                    "Tu carrito está vacío."
                );

                window.location.href =
                    "index.html";

                return;

            }


            // VALIDAR FORMULARIO

            const nombre =
                document.getElementById(
                    "nombre"
                ).value.trim();


            const apellido =
                document.getElementById(
                    "apellido"
                ).value.trim();


            const dni =
                document.getElementById(
                    "documento"
                ).value.trim();


            const telefono =
                document.getElementById(
                    "telefono"
                ).value.trim();


            const correo =
                document.getElementById(
                    "correo"
                ).value.trim();


            const direccion =
                document.getElementById(
                    "direccion"
                ).value.trim();


            const distrito =
                document.getElementById(
                    "distrito"
                ).value;


            if (
                !nombre ||
                !apellido ||
                !dni ||
                !telefono ||
                !correo ||
                !direccion ||
                !distrito
            ) {

                alert(
                    "Por favor completa todos los datos obligatorios."
                );

                return;

            }


            //-------------------------------------------------
            // MÉTODO DE PAGO
            //-------------------------------------------------

            const metodoPago =
                document.querySelector(
                    'input[name="metodoPago"]:checked'
                ).value;


            //-------------------------------------------------
            // TOTAL
            //-------------------------------------------------

            const total =
                carrito.reduce(

                    (suma, producto) =>

                        suma +
                        (
                            producto.precio *
                            producto.cantidad
                        ),

                    0

                );

//=========================================================
// GUARDAR ÚLTIMO PEDIDO
//=========================================================

const pedido = {

    nombre: nombre,

    apellido: apellido,

    dni: dni,

    telefono: telefono,

    correo: correo,

    direccion: direccion,

    distrito: distrito,

    metodoPago: metodoPago,

    total: total,

    fecha: new Date().toLocaleString(
        "es-PE"
    )

};


//=========================================================
// GUARDAR PEDIDO
//=========================================================

localStorage.setItem(
    "ultimoPedido",
    JSON.stringify(pedido)
);


//=========================================================
// VACIAR CARRITO
//=========================================================

localStorage.removeItem("carrito");


//=========================================================
// IR A CONFIRMACIÓN
//=========================================================

window.location.href =
    "confirmacion.html";

        }
    );

}


//=========================================================
// INICIAR
//=========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        mostrarProductosCheckout();

        actualizarTotal();

        actualizarContador();

        configurarMetodosPago();

        configurarCompra();

    }
);