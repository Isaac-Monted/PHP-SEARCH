// Cargar las funciones de eventos de gargar las diferentes paginas
import * as widgets from './widgets_articulo.js';

// Esta función se ejecutará cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // llenar la pagina con los datos
    OnLoadPage();
});


function OnLoadPage() {
    console.log("La página ha cargado completamente!"); // Mensaje para comprobar que se esta ejecutando al cargar
    try {
        widgets.LoadProductSelected(1)
    } catch (error) {
        console.error("Hubo un error al cargar los datos:", error);
    }
};