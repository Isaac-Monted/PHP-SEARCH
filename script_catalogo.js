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
                widgets.updateDOMWithProducts(data); // Función que actualizará el DOM con los productos
            })
            .catch(error => {
                console.error("Error al buscar productos:", error);
            });
    }
};

