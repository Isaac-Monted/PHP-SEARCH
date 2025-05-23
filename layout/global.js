import * as carrito from '../cotizador/script_cotizador.js';

export function ColocarNumeroCarrito() {
    const contador = document.getElementById("numeroArticulosEnCarrito");
    const articulos  = carrito.LeerArticuloCarrito();
    console.log(articulos);

    if (contador) {
        let total = 0;

        for (const key in articulos) {
            const item = articulos[key];
            if (typeof item === 'object' && item.Cantidad) {
                total += item.Cantidad;
            }
        }

        contador.innerText = total;
    } else {
        console.warn("No se encontró el elemento con id 'numeroArticulosEnCarrito'");
    }
}