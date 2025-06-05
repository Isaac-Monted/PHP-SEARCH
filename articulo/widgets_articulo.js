// Funcion que genera el contenido de la pagina dependiendo del producto selecionado
export function LoadProductSelected(Id_producto) {
    console.log(`Se coloco los datos en el DOM: ${Id_producto}`);
}

// Función que actualiza el DOM con los datos del producto
export function updateProductDOM(products) {
    const productContainer = document.getElementById(
        "product-cards-article-only"
    ); // El contenedor donde se mostrarán los productos
    let marca = ""; // Variable para guardar la marca del producto

    // Limpiar los productos anteriores
    productContainer.innerHTML = "";

    // Comprobar si hay un error en los datos (por ejemplo, "error" en la respuesta)
    if (products.error) {
        productContainer.innerHTML = `<p>${products.error}</p>`; // Mostrar el mensaje de error en el DOM
        return;
    }

    // Si no hay productos, mostrar un mensaje adecuado
    if (products.length === 0) {
        productContainer.innerHTML = "<p>No se encontraron productos.</p>";
        return;
    }

    // Recorrer los productos y crear elementos para mostrarlos
    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-cards-article-only");

        if (product.MARCA == "UNDEFINED") {
            marca = "";
        } else {
            marca = product.MARCA;
        }
        // Agregar contenido a la tarjeta del producto
        productCard.innerHTML = `
<div class="row gx-4 gx-lg-5 align-items-center">
    <div class="col-md-6  text-center">
      <h4>${product.NOMBRE}</h4>
        <p class="text-justify">${product.DESCRIPCION}</p>
            <ul class="list-group list-group-horizontal-lg text-left">
            <li class="list-group-item text-left"><p class="text-left">SKU: </p> </li>
            <li class="list-group-item">${product.SKU}</li>
            </ul>
            <ul class="list-group list-group-horizontal-lg">
            <li class="list-group-item"><p class="text-left">Marca: </p> </li>
            <li class="list-group-item">${marca}</li>
            </ul>
            <ul class="list-group list-group-horizontal">
            <li class="list-group-item"><p>Peso: </p></li>
            <li class="list-group-item">${product.PESO}</li>
            </ul>
            <ul class="list-group list-group-horizontal">
            <li class="list-group-item"><p>Ancho: </p> </li>
            <li class="list-group-item">${product.ANCHO}</li>
            </ul>
            <ul class="list-group list-group-horizontal">
            <li class="list-group-item"><p>Largo: </p> </li>
            <li class="list-group-item">${product.LARGO}</li>
            </ul>
            <ul class="list-group list-group-horizontal">
            <li class="list-group-item"><p>Alto: </p> </li>
            <li class="list-group-item">${product.ALTO}</li>
            </ul>
    </div>
            <div class="col-md-6"> <img src="data:image/jpg;base64,${product.IMAGE}" alt="Descripción de la imagen"
                    style="width: 350px; heigth: 350px;"></div>
            </div>
`;
        // Agregar la tarjeta del producto al contenedor
        productContainer.appendChild(productCard);
    });
}


/*    
        <h3>${product.NOMBRE}</h3>
        <p>${product.DESCRIPCION}</p>
        <p>Codigo: ${product.CODIGO}</p>
        <p>SKU: ${product.SKU}</p>
        <p>Marca: ${marca}</p>
        <p>Modelo: ${product.MODELO}</p> 
        
            <ol class="list-group list-group-numbered">
            <li class="list-group-item">Un elemento de lista</li>
            <li class="list-group-item">Un elemento de lista</li>
            <li class="list-group-item">Un elemento de lista</li>
            </ol>
*/