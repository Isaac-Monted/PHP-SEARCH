// Cargar las funciones de eventos de gargar las diferentes paginas
import * as widgets from './widgets_catalogo.js';

// Esta función se ejecutará cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // llenar la pagina con los datos
    OnLoadPage();
});


function OnLoadPage() {
    console.log("La página ha cargado completamente!"); // Mensaje para comprobar que se esta ejecutando al cargar
    try {
        widgets.GenerarColumnaCategorias(); // Función que genera las categorías
        widgets.GenerarContenedorProductos(); // Función que genera los productos
    } catch (error) {
        console.error("Hubo un error al cargar los datos:", error);
    }
};


export function ProductSearch() {
    // Llamamos a la funcion changeSearch para reciclar codigo
    ChangeSearch()
};

export function ChangeSearch() {
    const searchQuery = document.getElementById("search").value; // Obtiene el texto mientras el usuario escribe
    console.log("El texto de búsqueda cambió a: " + searchQuery);

    // CONSULTA AJAX
    if (searchQuery.length > 0) {  // Solo hacer la búsqueda si el término es mayor a 0 caracteres
        // Hacer la solicitud GET al archivo PHP con el parámetro search_term
        fetch(`getData.php?action=searchProductos&search_term=${encodeURIComponent(searchQuery)}`)
            .then(response => response.json()) // Espera la respuesta como JSON
            .then(data => {
                console.log("Datos obtenidos: ", data);
                updateDOMWithProducts(data); // Función que actualizará el DOM con los productos
            })
            .catch(error => {
                console.error("Error al buscar productos:", error);
            });
    }
};

function updateDOMWithProducts(products) {
    const productContainer = document.getElementById("product-cards"); // El contenedor donde se mostrarán los productos

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
        productCard.classList.add("product-card");

        // Agregar contenido a la tarjeta del producto
        productCard.innerHTML = `
            <h3>${product.NOMBRE}</h3>
            <p>${product.DESCRIPCION}</p>
            <p>Precio: $${product.PRECIO}</p>
        `;

        // Agregar la tarjeta del producto al contenedor
        productContainer.appendChild(productCard);
    });
}

