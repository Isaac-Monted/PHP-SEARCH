// Cargar las funciones de los eventos de cargar las diferente Paginas
import * as CarritoF from './script_cotizador.js';

document.addEventListener('DOMContentLoaded', function() {
    CarritoF.LeerArticuloCarrito();
});

export function BorrarCarrito() {
    CarritoF.EliminarTodoElCarrito();
}

export function MostrarTodoElCarrito() {
    CarritoF.LeerArticuloCarrito();
}