// Funcion que genera el contenido con las categorias consultadas de la base
export function GenerarColumnaCategorias(categorias){
    console.log("se a generado las categorias");
    const containerCategorias = document.getElementById("list_categories") // El contenedor donde se mostrarán las categorias
    containerCategorias.innerHTML = ''; // Limpiar el contenedor para agregar las categorias

    // Comprobar si hay un error en los datos (por ejemplo, "error" en la respuesta)
    if (categorias.error) {
        containerCategorias.innerHTML = `<p>${categorias.error}</p>`; // Mostrar el mensaje de error en el DOM
        return;
    }

    // Si no hay categorias, mostrar un mensaje adecuado
    if (categorias.length === 0) {
        containerCategorias.innerHTML = '<p>No se encontraron categorias.</p>';
        return;
    }

    // Recorrer los productos y crear elementos para mostrarlos
    categorias.forEach(categoria => {
        const categoriaCard = document.createElement("div");
        categoriaCard.classList.add("product-cards-one");

        // Agregar contenido a la tarjeta de la categoria
        categoriaCard.innerHTML = `
        <h3>${categoria.NOMBRE}</h3>
        `;

        // Agregar la tarjeta de la categoria al contenedor
        containerCategorias.appendChild(categoriaCard);
    });
};

// Funcion que genera el contenido con los productos consultados de la base
export function GenerarContenedorProductos(){
    console.log("Se a generado los productos");
};

export function updateDOMWithProducts(products) {
    const productContainer = document.getElementById("product-cards"); // El contenedor donde se mostrarán los productos
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
        productCard.classList.add("product-cards-one");

        if (product.MARCA == "UNDEFINED"){
            marca = ""
        }else{
            marca = product.MARCA
        }

        // Agregar contenido a la tarjeta del producto
        productCard.innerHTML = `
        <h3><a href="articulo.html?id=${product.ID_PRODUCTO}" target="_blank">${product.NOMBRE}</a></h3>
        <p>${product.DESCRIPCION}</p>
        <p>Marca: ${marca}</p>
        `;

        // <h3>${product.NOMBRE}</h3>
        // Agregar la tarjeta del producto al contenedor
        productContainer.appendChild(productCard);
    });
};