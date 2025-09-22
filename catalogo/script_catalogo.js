// Cargar las funciones de eventos de gargar las diferentes paginas
import * as global from '../layout/global.js';
import * as widgets from './widgets_catalogo.js';

// Esta función se ejecutará cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', async function() {
    await global.cargarHTML('HeaderCatalogo', '../layout/header.html');
    await global.cargarHTML('FooterCatalogo', '../layout/footer.html');
    // llenar la pagina con los datos
    OnLoadPage();
    global.ColocarNumeroCarrito();

    // Colocar una familia aleatorea al cargar la pagina
    let familiaAleatoria = numeroAleatorio(1,40);
    ClickButtonCategories(familiaAleatoria);
});


function OnLoadPage() {
    //console.log("La página ha cargado completamente!"); // Mensaje para comprobar que se esta ejecutando al cargar
    try {
        LoadColumCategorias(); // Función que genera las categorías
        widgets.GenerarContenedorProductos(); // Función que genera los productos
    } catch (error) {
        console.error("Hubo un error al cargar los datos:", error);
    }
};

export function LoadColumCategorias(){
    fetch(`../backend/getData.php?action=getAllFamilias`)
        .then(respoinse => respoinse.json()) // Espera la respuesta como JSON
        .then(data => {
            //console.log("Datos obtenidos: ", data);
            widgets.GenerarColumnaCategorias(data); // Función que actualizará el DOM con las categorias
        })
};

export function ProductSearch() {
    // Llamamos a la funcion changeSearch para reciclar codigo
    ChangeSearch();
};

export function ChangeSearch() {
    const searchQuery = document.getElementById("search").value; // Obtiene el texto mientras el usuario escribe
    //console.log("El texto de búsqueda cambió a: " + searchQuery);

    // CONSULTA AJAX
    if (searchQuery.length > 0) {  // Solo hacer la búsqueda si el término es mayor a 0 caracteres
        // Hacer la solicitud GET al archivo PHP con el parámetro search_term
        fetch(`../backend/getData.php?action=searchProductos&search_term=${encodeURIComponent(searchQuery)}`)
            .then(response => response.json()) // Espera la respuesta como JSON
            .then(data => {
                //console.log("Datos obtenidos: ", data);
                widgets.updateDOMWithProducts(data); // Función que actualizará el DOM con los productos
            })
            .catch(error => {
                console.error("Error al buscar productos:", error);
            });
    }else{
        // Si el campo de búsqueda está vacío, puedes limpiar los productos o mostrar un mensaje
        const productContainer = document.getElementById("product-cards"); // El contenedor donde se mostrarán los productos
        // Limpiar los productos anteriores
        productContainer.innerHTML = '';
    }
};


export function ClickButtonCategories(categoria) {
    const searchQuery = categoria; // Obtiene la categoria del boton clickeado
    //console.log("Categoria seleccionada: " + searchQuery);

    // CONSULTA AJAX
    if (searchQuery> 0) {  // Solo hacer la búsqueda si el término es mayor a 0 caracteres
        // Hacer la solicitud GET al archivo PHP con el parámetro search_term
        fetch(`../backend/getData.php?action=getProductByFamilia&id_familia=${encodeURIComponent(searchQuery)}`)
            .then(response => response.json()) // Espera la respuesta como JSON
            .then(data => {
                //console.log("Datos obtenidos: ", data);
                widgets.updateDOMWithProducts(data); // Función que actualizará el DOM con los productos
            })
            .catch(error => {
                console.error("Error al buscar productos:", error);
            });
    }else{
        // Si el campo de búsqueda está vacío, puedes limpiar los productos o mostrar un mensaje
        const productContainer = document.getElementById("product-cards"); // El contenedor donde se mostrarán los productos
        // Limpiar los productos anteriores
        productContainer.innerHTML = '';
    }
};

function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
