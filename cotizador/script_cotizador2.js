// Cargar las funciones de los eventos de cargar las diferente Paginas
import * as CarritoF from './script_cotizador.js';
import * as widgets from './widgets_cotizador.js';

document.addEventListener('DOMContentLoaded', function() {
    ColocarLosDatosDelCarrito();
});

export function BorrarCarrito() {
    CarritoF.EliminarTodoElCarrito();
}

export function MostrarTodoElCarrito() {
    alert("Se ha enviado tu cotizacion")
}

function ColocarLosDatosDelCarrito() {
    const Descripcion = CarritoF.LeerArticuloCarrito();
    widgets.ColocarElCarritoEnLaPagina(Descripcion);
}