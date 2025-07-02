import * as carrito from '../cotizador/script_cotizador.js';

export async function ColocarNumeroCarrito() {
    const contador = await document.getElementById("numeroArticulosEnCarrito");
    const articulos  = await carrito.LeerArticuloCarrito();
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