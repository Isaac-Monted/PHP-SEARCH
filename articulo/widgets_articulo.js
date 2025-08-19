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
    let imagen = ""; // Variable para guardar la imagen del producto

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

        // Validacion de la infortmacion que se mostrara en el DOM
        if (product.MARCA == "UNDEFINED") {
            marca = "Sin marca";
        } else {
            marca = product.MARCA;
        }

        // validacion de la imagen del producto
        if (product.IMAGE == null || product.IMAGE == "") {
            imagen = "../assets/default.jpg";
        } else {
            console.log(product.IMAGE);
            imagen = `https://riopisuena.com.mx/${product.IMAGE}`;
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

        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Peso</th>
                    <th scope="col">Ancho</th>
                    <th scope="col">Largo</th>
                    <th scope="col">Alto</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">${product.PESO}</th>
                    <td>${product.ANCHO}</td>
                    <td>${product.LARGO}</td>
                    <td>${product.ALTO}</td>
                </tr>
            </tbody>
        </table>

    </div>
            <div class="col-md-6"> <img src="${imagen}" alt="Descripción de la imagen"
                    style="width: 350px; heigth: 350px;"></div>
            </div>
`;
        // Agregar la tarjeta del producto al contenedor   -> data:image/jpg;base64,
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