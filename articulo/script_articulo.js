// Cargar las funciones de eventos de gargar las diferentes paginas
import * as Carrito from '../cotizador/script_cotizador.js';
import * as global from '../layout/global.js';
import * as widgets from './widgets_articulo.js';

// Esta función se ejecutará cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    const productId = getProductIdFromURL(); // Obtener el ID del producto desde la URL
    if (productId) {
        fetchProductDetails(productId); // Hacer el fetch con el ID y actualizar el DOM
    } else {
        // Si no hay ID en la URL, lanzamos un error de depuración y mostramos un mensaje al usuario
        console.error("Error: No se proporcionó un ID de producto en la URL.");
        alert("No se proporcionó un ID de producto. Por favor, asegúrate de que la URL sea correcta.");
        window.location.href = "../catalogo/catalogo.html"; // Redirige a la página principal.
    }

    Carrito.InicializarObjeto();
    global.ColocarNumeroCarrito();
});

// Función para obtener el ID del producto desde la URL
function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search); // Extraer el valor
    return urlParams.get('id'); // Devuelve el ID si existe en la URL
}

// Función que hace el fetch para obtener los datos del producto
function fetchProductDetails(productId) {
    console.log("Id:", encodeURIComponent(productId));
    fetch(`../backend/getData.php?action=getProductById&id_producto=${encodeURIComponent(productId)}`) // URL API
        .then(response => response.json())
        .then(data => {
            if (data) {
                //console.log("Datos obtenidos: ", data);
                widgets.updateProductDOM(data); // Llamamos a la función que actualiza el DOM con los datos
            } else {
                console.error("Error: No se encontraron datos para el producto con ID:", productId);
                alert("No se encontraron datos para este producto. Intenta nuevamente más tarde.");
                window.location.href = "../catalogo/catalogo.html"; // Redirige a la página principal.
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos del producto:', error);
            alert("Hubo un error al intentar cargar los detalles del producto.");
            window.location.href = "../catalogo/catalogo.html"; // Redirige a la página principal.
        });
}

export function AgregarAlCarrito(){
    fetch(`../backend/getData.php?action=getProductById&id_producto=${encodeURIComponent(getProductIdFromURL())}`) // URL API
        .then(response => response.json())
        .then(data => {
            if (data) {
                //console.log("Datos obtenidos: ", data);
                data.forEach(Articulo => {
                    Carrito.AgregarArticuloCarrito(Articulo.ID_PRODUCTO, Articulo.NOMBRE, 1)
                }); // Llamamos a la función que actualiza el DOM con los datos
                alert("Se a agregado al carrito");
                global.ColocarNumeroCarrito();
            } else {
                console.error("Error: No se encontraron datos para el producto con ID:", productId);
                alert("No se pudo agregar al carrito. Intenta nuevamente más tarde.");
                window.location.href = "../catalogo/catalogo.html"; // Redirige a la página principal.
            }
            Carrito.LeerArticuloCarrito();
        })
        .catch(error => {
            console.error('Error al agregar el producto:', error);
            alert("Hubo un error al intentar cargar el producto al carrito.");
            window.location.href = "../catalogo/catalogo.html"; // Redirige a la página principal.
        });
}