import * as controller from "./script_cotizador2.js";


export function ColocarElCarritoEnLaPagina(descripcion){
    const CarritoContainer = document.getElementById("Descripcion-del-carrito");
    // Limpiar el carrito para yenarlo nuevamente
    CarritoContainer.innerHTML = '';

    // Comprobar si hay un error en los datos (por ejemplo, "error" en la respuesta)
    if (descripcion.error){
        CarritoContainer.innerHTML = `<p>${descripcion.error}</p>`; // Mostrar el mensaje de error en el DOM
    }
    // Si no hay productos, mostrar un mensaje adecuado
    if (Object.keys(descripcion).length === 1 && descripcion["0"] !== undefined){
        CarritoContainer.innerHTML = '<p>No se encontraron productos.</p>';
    }

    // Recorrer los productos y crear elementos para mostrarlos
    Object.keys(descripcion).forEach(key => {
        if (key === "0") return; // Ignorar el contador, si estás usando ese sistema
        const Articulos = descripcion[key]; // Aquí el objeto del producto

        const productCard = document.createElement("div");
        productCard.classList.add("container");

        // Agregar contenido a la tarjeta del producto
        productCard.innerHTML = `
            <div class="caja1">
                <div class="left-column"> <!-- Columna izquierda -->
                    <div>
                        <!-- <h5>Imagen xd</h5> -->
                    </div>
                </div>
                <div class="center-column"> <!-- Columna centro -->
                    <div>
                        <p>${Articulos.Nombre}</p>
                    </div>
                    <div>
                        <input class="casillaNumeros" type="text" id="Cantidad${Articulos.Id}" name="Cantidad${Articulos.Id}" value=${Articulos.Cantidad} style="text-align: center;" disabled>
                        <button id="BotonDecremento${Articulos.Id}"> - </button>
                        <button id="BotonIncremento${Articulos.Id}"> + </button>
                    </div>
                    <div>

                    </div>
                </div>
                <div class="right-column"> <!-- Columna derecha -->
                    <div>
                        <button id="BotonQuitar${Articulos.Id}"> Quitar </button>
                    </div>
                </div>
            </div>
        `;

        // Agregar la tarjeta del producto al contenedor
        CarritoContainer.appendChild(productCard);

        // Agregar funcionalidad
        const inputCantidad = document.getElementById(`Cantidad${Articulos.Id}`);
        const btnIncremento = document.getElementById(`BotonIncremento${Articulos.Id}`);
        const btnDecremento = document.getElementById(`BotonDecremento${Articulos.Id}`);
        const btnQuitar = document.getElementById(`BotonQuitar${Articulos.Id}`);

        btnIncremento.addEventListener('click', () => {
            console.log("Incremento");
            controller.SumarALaCantidadDelProducto(key, Articulos.Id, Articulos.Nombre, Articulos.Cantidad);
        });

        btnDecremento.addEventListener('click', () => {
            console.log("Decremento");
            controller.RestarALaCantidadDelProducto(key, Articulos.Id, Articulos.Nombre, Articulos.Cantidad);
        });

        btnQuitar.addEventListener('click', () => {
            console.log("Quitar" + key);
            controller.QuitarArticuloDelCarrito(key);
        });
    });
}