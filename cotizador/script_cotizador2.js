// Cargar las funciones de los eventos de cargar las diferente Paginas
import * as global from '../layout/global.js';
import * as CarritoF from './script_cotizador.js';
import * as widgets from './widgets_cotizador.js';

document.addEventListener('DOMContentLoaded', async function() {
    await global.cargarHTML('HeaderCotizador', '../layout/header.html');
    await global.cargarHTML('FooterCotizador', '../layout/footer.html');
    ColocarLosDatosDelCarrito();
    global.ColocarNumeroCarrito();
});

export function ColocarLosDatosDelCarrito() {
    const Descripcion = CarritoF.LeerArticuloCarrito();
    widgets.ColocarElCarritoEnLaPagina(Descripcion);
}

export function BorrarCarrito() {
    CarritoF.EliminarTodoElCarrito();
    ColocarLosDatosDelCarrito();
}

export function MostrarTodoElCarrito() {
    const Productos = CarritoF.LeerArticuloCarrito(); // Traer el objeto almacenado
    if (Productos[0] === 0){
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

export function RestarALaCantidadDelProducto(Key, Id, Nombre, Cantidad, Imagen) {
    if (Cantidad >= 1){
        CarritoF.EditarArticuloCarrito(Key, Id, Nombre, Cantidad - 1, Imagen);
        ColocarLosDatosDelCarrito();
        global.ColocarNumeroCarrito();
    }else {
        CarritoF.EliminarArticuloCarrito(Key);
        ColocarLosDatosDelCarrito();
        global.ColocarNumeroCarrito();
    }
    
}

export function SumarALaCantidadDelProducto(Key, Id, Nombre, Cantidad, Imagen) {
    if (Cantidad < 99){
        CarritoF.EditarArticuloCarrito(Key, Id, Nombre, Cantidad + 1, Imagen);
        ColocarLosDatosDelCarrito();
        global.ColocarNumeroCarrito();
    }else {
        alert("La cantidad indicada exede al disponible");
    }
}

export function BuscarArticuloPorId(productId){
    //console.log("Id:", productId);
    return fetch(`../backend/getData.php?action=getImageProductById&id_producto=${productId}`) // URL API
        .then(response => response.json())
        .then(data => {
            if (data && Array.isArray(data) && data.length > 0) {
                const obj = data[0];
                //console.log("Datos obtenidos: ", obj);
                return obj;  // debuelve el objeto en vez del arreglo
            } else {
                console.error("Error: No se encontraron datos para el producto con ID:", productId);
                return null; // se regresa null para no comprometer la ingeridad del codigo
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos del producto:', error);
            return null; // se regresa null para no comprometer la ingeridad del codigo
        });
}
