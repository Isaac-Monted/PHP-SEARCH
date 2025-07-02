// Cargar las funciones de los eventos de cargar las diferente Paginas
import * as global from '../layout/global.js';
import * as CarritoF from './script_cotizador.js';
import * as widgets from './widgets_cotizador.js';

document.addEventListener('DOMContentLoaded', function() {
    global.ColocarNumeroCarrito();
    ColocarLosDatosDelCarrito();
});

function ColocarLosDatosDelCarrito() {
    const Descripcion = CarritoF.LeerArticuloCarrito();
    widgets.ColocarElCarritoEnLaPagina(Descripcion);
}

export function BorrarCarrito() {
    CarritoF.EliminarTodoElCarrito();
}

export function MostrarTodoElCarrito() {
    const Productos = CarritoF.LeerArticuloCarrito(); // Traer el objeto almacenado
    if (Object.keys(Productos).length === 1 && Productos[0]){
        // Si el objeto se queda en blanco y solo queda el contador entonces se niega la cotizacion
        alert("Agrege un articulo al carrito para poder cotizar")
    }else {
        window.location.href = '../formulario/formulario.html';
    }
}

export function QuitarArticuloDelCarrito(Id){
    CarritoF.EliminarArticuloCarrito(Id);
    ColocarLosDatosDelCarrito();
    global.ColocarNumeroCarrito();
}

export function RestarALaCantidadDelProducto(Key, Id, Nombre, Cantidad) {
    if (Cantidad >= 1){
        CarritoF.EditarArticuloCarrito(Key, Id, Nombre, Cantidad - 1);
        ColocarLosDatosDelCarrito();
        global.ColocarNumeroCarrito();
    }else {
        CarritoF.EliminarArticuloCarrito(Key);
        ColocarLosDatosDelCarrito();
        global.ColocarNumeroCarrito();
    }
    
}

export function SumarALaCantidadDelProducto(Key, Id, Nombre, Cantidad) {
    if (Cantidad < 99){
        CarritoF.EditarArticuloCarrito(Key, Id, Nombre, Cantidad + 1);
        ColocarLosDatosDelCarrito();
        global.ColocarNumeroCarrito();
    }else {
        alert("La cantidad indicada exede al disponible");
    }
}
