import * as controller from "./script_cotizador2.js";

export function ColocarElCarritoEnLaPagina(descripcion) {
  const CarritoContainer = document.getElementById("Descripcion-del-carrito");
  // Limpiar el carrito para yenarlo nuevamente
  CarritoContainer.innerHTML = "";
  let imagen = ""; // Variable para guardar la imagen del producto

  // Comprobar si hay un error en los datos (por ejemplo, "error" en la respuesta)
  if (descripcion.error) {
    CarritoContainer.innerHTML = `<p>${descripcion.error}</p>`; // Mostrar el mensaje de error en el DOM
  }
  // Si no hay productos, mostrar un mensaje adecuado
  if (Object.keys(descripcion).length === 1 && descripcion["0"] !== undefined) {
    CarritoContainer.innerHTML = "<p>No se encontraron productos.</p>";
  }

  // Recorrer los productos y crear elementos para mostrarlos
  Object.keys(descripcion).forEach((key) => {
    if (key === "0") return; // Ignorar el contador, si estás usando ese sistema
    const Articulos = descripcion[key]; // Aquí el objeto del producto

    const productCard = document.createElement("div");
    productCard.classList.add("container");
    productCard.classList.add("stilo-carrito");
    productCard.classList.add("txt-prod");

    // validacion de la imagen del producto
    if (Articulos.IMAGE == null || Articulos.IMAGE == "") {
      imagen = "../assets/default.jpg";
    } else {
      console.log(Articulos.IMAGE);
      imagen = `https://riopisuena.com.mx/${Articulos.IMAGE}`;
    }

    // Agregar contenido a la tarjeta del producto
    productCard.innerHTML = `
<div class="caja1">

    <div class="container">
        <div class="row col-lg-12 mb-12">

            <div class="col-12 col-md-4 text-center">
                <img src="${imagen}" alt="Descripción de la imagen" style="width:40%; heigth:40%;" class="text-center">
            </div>
            <div class="col-12 col-md-2">
                <p class="text-left">Producto</p>
                <a href="../articulo/articulo.html?id=${Articulos.Id}" class="txt-prod">
                    <p class="txt-prod">${Articulos.Nombre}</p>
                </a>
            </div>

            <div class="col-12 col-md-1">

                <p class="text-center">Cantidad</p>
                <input class="casillaNumeros col-lg-4" type="text" id="Cantidad${Articulos.Id}"
                    name="Cantidad${Articulos.Id}" value=${Articulos.Cantidad} style="text-align: center;" disabled>
            </div>

            <div class="col-12 col-md-2 text-center" role="group" aria-label="Basic example">
                <p class="text-center">Cantidad</p>
                <button class="btn btn-primary" id="BotonDecremento${Articulos.Id}"> - </button>
                <button class="btn btn-primary" id="BotonIncremento${Articulos.Id}"> + </button>
            </div>

            <div class="col-12 col-md-2">
                <p class="text-left">Opciones</p>
                <button class="btn btn-warning text-center" id="BotonQuitar${Articulos.Id}"> Quitar </button>
            </div>
        </div>
    </div>
</div>

`;

    // Agregar la tarjeta del producto al contenedor
    CarritoContainer.appendChild(productCard);

    // Agregar funcionalidad
    const inputCantidad = document.getElementById(`Cantidad${Articulos.Id}`);
    const btnIncremento = document.getElementById(
      `BotonIncremento${Articulos.Id}`
    );
    const btnDecremento = document.getElementById(
      `BotonDecremento${Articulos.Id}`
    );
    const btnQuitar = document.getElementById(`BotonQuitar${Articulos.Id}`);

    btnIncremento.addEventListener("click", () => {
      console.log("Incremento");
      controller.SumarALaCantidadDelProducto(
        key,
        Articulos.Id,
        Articulos.Nombre,
        Articulos.Cantidad
      );
    });

    btnDecremento.addEventListener("click", () => {
      console.log("Decremento");
      controller.RestarALaCantidadDelProducto(
        key,
        Articulos.Id,
        Articulos.Nombre,
        Articulos.Cantidad
      );
    });

    btnQuitar.addEventListener("click", () => {
      console.log("Quitar" + key);
      controller.QuitarArticuloDelCarrito(key);
    });
  });
}
