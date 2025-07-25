// Cargar las funciones de eventos de gargar las diferentes paginas
import { ClickButtonCategories } from './script_catalogo.js';

// Funcion que genera el contenido con las categorias consultadas de la base
export function GenerarColumnaCategorias(categorias){
    console.log("se a generado las categorias");
    const containerCategorias = document.getElementById("list_categories") // El contenedor donde se mostrarán las categorias
    containerCategorias.innerHTML = ''; // Limpiar el contenedor para agregar las categorias

    // Comprobar si hay un error en los datos (por ejemplo, "error" en la respuesta)
    if (categorias.error) {
        containerCategorias.innerHTML = `<li>${categorias.error}</li>`; // Mostrar el mensaje de error en el DOM
        return;
    }

    // Si no hay categorias, mostrar un mensaje adecuado
    if (categorias.length === 0) {
        containerCategorias.innerHTML = '<li>No se encontraron categorias.</li>';
        return;
    }

    // Recorrer los productos y crear elementos para mostrarlos
    categorias.forEach(categoria => {
        if(categoria.NOMBRE == "sin categoria"){
            return;
        }
        const categoriaCard = document.createElement("li");

        
        //categoriaCard.classList.add("product-cards-one");

        // Crear el botón para la categoría
        const botonCategoria = document.createElement("a");
        //botonCategoria.classList.add("boton_categoria");
        botonCategoria.textContent = categoria.NOMBRE;

        // Agregar el evento onclick al botón
        categoriaCard.addEventListener("click", () => {
            // Aquí puedes pasar los parámetros que quieras, por ejemplo:
            console.log(`Botón clickeado: ${categoria.NOMBRE}`);
            // Llamar a una función, por ejemplo, una función que maneje lo que sucede al hacer clic
            console.log(categoria.ID_CATEGORIA)
            // Por ejemplo, enviar la categoría seleccionada a una función
            ClickButtonCategories(categoria.ID_FAMILIA);  // Llamada a la función con el objeto de categoría
        });

        // Agregar el botón al contenedor de la tarjeta
        categoriaCard.appendChild(botonCategoria);

        // Agregar la tarjeta de la categoria al contenedor
        containerCategorias.appendChild(categoriaCard);
    });
};

// Funcion que genera el contenido con los productos consultados de la base
export function GenerarContenedorProductos(){
    console.log("Se a generado los productos");
};

export function updateDOMWithProducts(products) {
    const productContainer = document.getElementById("product-cards"); // El contenedor donde se mostrarán los productos
    let marca = "" // Variable para guardar la marca del producto

    // Limpiar los productos anteriores
    productContainer.innerHTML = '';

    // Comprobar si hay un error en los datos (por ejemplo, "error" en la respuesta)
    if (products.error) {
        productContainer.innerHTML = `<p>${products.error}</p>`; // Mostrar el mensaje de error en el DOM
        return;
    }

    // Si no hay productos, mostrar un mensaje adecuado
    if (products.length === 0) {
        productContainer.innerHTML = '<p>No se encontraron productos.</p>';
        return;
    }

    // Recorrer los productos y crear elementos para mostrarlos
    products.forEach(product => {
        const productCard = document.createElement("div"); // button
        productCard.classList.add("col-lg-4", "col-md-4", "col-sm-6", "mb-4"); //product-cards-one

        productCard.onclick = () => {
            window.location.href = `../articulo/articulo.html?id=${product.ID_PRODUCTO}`;
        };

        if (product.MARCA == "UNDEFINED"){
            marca = ""
        }else{
            marca = product.MARCA
        }

        // Agregar contenido a la tarjeta del producto
        productCard.innerHTML = `
            <div class="card h-100">
                <!--<a href="../articulo/articulo.html?id=${product.ID_PRODUCTO}"><img class="card-img-top" src="https://via.placeholder.com/700x400" alt=""></a>-->
                <div class="card-body">
                    <h4 class="card-title">
                        <a href="../articulo/articulo.html?id=${product.ID_PRODUCTO}">${product.NOMBRE}</a>
                    </h4>
                    <p class="card-text">${product.DESCRIPCION}</p>
                    <p class="card-text">Marca: ${marca}</p>
                </div>
            </div>
            `;


        // Agregar la tarjeta del producto al contenedor
        productContainer.appendChild(productCard);
    });
};