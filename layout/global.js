import * as carrito from '../cotizador/script_cotizador.js';

export async function ColocarNumeroCarrito() {
    const articulos  = await carrito.LeerArticuloCarrito();
    const contador = await esperarElementoPorId("numeroArticulosEnCarrito");
    //console.log(articulos);

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

export async function cargarHTML(id, url) {
    const res = await fetch(url);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
}

export function esperarElementoPorId(id) {
    return new Promise(resolve => {
        const el = document.getElementById(id);
        if (el) return resolve(el);

        const observer = new MutationObserver(() => {
            const el = document.getElementById(id);
            if (el) {
                resolve(el);
                observer.disconnect();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    });
}
