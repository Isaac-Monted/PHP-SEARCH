// Funcion que genera el contenido de la pagina dependiendo del producto selecionado
export function LoadProductSelected(Id_producto){
    console.log(`Se coloco los datos en el DOM: ${Id_producto}`)
};

// Función que actualiza el DOM con los datos del producto
export function updateProductDOM(products) {
    const productContainer = document.getElementById("product-cards-article-only"); // El contenedor donde se mostrarán los productos
    let marca = "" // Variable para guardar la marca del producto

    // Limpiar los productos anteriores
    productContainer.innerHTML = '';

    // Comprobar si hay un error en los datos (por ejemplo, "error" en la respuesta)
    if (products.error) {
        productContainer.innerHTML = `<p>${products.error}</p>`; // Mostrar el mensaje de error en el DOM
        return;
    }

    // Si no hay productos, mostrar un mensaje adecuado
    if (products.length === 0) {
        productContainer.innerHTML = '<p>No se encontraron productos.</p>';
        return;
    }

    // Recorrer los productos y crear elementos para mostrarlos
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-cards-article-only");

        if (product.MARCA == "UNDEFINED"){
            marca = ""
        }else{
            marca = product.MARCA
        }

        // Agregar contenido a la tarjeta del producto
        productCard.innerHTML = `
            <h3>${product.NOMBRE}</h3>
            <p>${product.DESCRIPCION}</p>
            <p>Codigo: ${product.CODIGO}</p>
            <p>SKU: ${product.SKU}</p>
            <p>Marca: ${marca}</p>
            <p>Modelo: ${product.MODELO}</p>
            <table border="1">
                <thead>
                    <tr>
                        <th>Peso</th>
                        <th>Ancho</th>
                        <th>Largo</th>
                        <th>Alto</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${product.PESO}</td>
                        <td>${product.ANCHO}</td>
                        <td>${product.LARGO}</td>
                        <td>${product.ALTO}</td>
                    </tr>
                </tbody>
            </table>
            <img src="data:image/jpg;base64,${product.IMAGE}" alt="Descripción de la imagen" style="width: 350px; heigth: 350px;">
        `;

        // Agregar la tarjeta del producto al contenedor
        productContainer.appendChild(productCard);
    });
}
