
// =============== CRUD de el cotizador local ===============

export function InicializarObjeto(){
    if (!localStorage.getItem('productos')) {
        localStorage.setItem('productos', JSON.stringify({0:0}));
    }
}

export function EliminarTodoElCarrito(){
    if (localStorage.getItem('productos')) {
        localStorage.setItem('productos', JSON.stringify({0:0}));
    }
}

function GuardarObjetoEnStorage(objeto){
    localStorage.setItem('productos', JSON.stringify(objeto));
}

export function AgregarArticuloCarrito(Id, Nombre, Cantidad, Imagen){
    try {
        const Productos = LeerArticuloCarrito(); // Traer el objeto almacenado

        // Validar si el nuevo articulo no esta registrado
        for (let key in Productos) {
            if (key === "0") continue;

            const producto = Productos[key] // Traer los valores del Id
            if (producto.Id === Id){ // Si ya existe =>
                EditarArticuloCarrito(key, producto.Id, producto.Nombre, producto.Cantidad + Cantidad, producto.Imagen); // Editar la cantidad
                return true;
            }
            
        }

        let NuevoId = Productos[0] + 1; // generar un id para el nuevo objeto
        Productos[0] = NuevoId; // Actualizar el contador
        Productos[NuevoId] = {'Id':Id,'Nombre':Nombre,'Cantidad':Cantidad, 'Imagen':Imagen}; // Construir el objeto
        GuardarObjetoEnStorage(Productos); // Guardar el nuevo objeto
        return true;
    } catch (error) {
        console.log(error); // Imprimir el error para depuracion
        return false;
    }
}

export function EditarArticuloCarrito(Id_storage, Id_producto, Nombre, Cantidad, Imagen){
    try {
        const Productos = LeerArticuloCarrito(); // Traer el objeto almacenado

        if (Productos[Id_storage]){ // Si el id existe =>
            Productos[Id_storage] = {'Id':Id_producto,'Nombre':Nombre,'Cantidad':Cantidad, 'Imagen':Imagen} // Construir el objeto
            GuardarObjetoEnStorage(Productos); // Guardar el nuevo objeto
            return true;
        }else{
            return false;
        }
    } catch {
        console.log(error); // Imprimir el error para depuracion
        return false;
    }
}

export function LeerArticuloCarrito(){
    let Productos = JSON.parse(localStorage.getItem('productos')) || {0:0};
    //console.log(Productos);
    return Productos;
}

export function EliminarArticuloCarrito(id){
    try {
        const Productos = LeerArticuloCarrito(); // Traer el objeto almacenado
        if (Productos[id]){ // si el id a eliminar existe =>
            delete Productos[id]; // Borrar el valor de ese id

            if (Object.keys(Productos).length === 1 && Productos[0]){
                Productos[0] = 0 // Si el objeto se queda en blanco y solo queda el contador entonces se resetea el contador
            }

            GuardarObjetoEnStorage(Productos); // Gardar el nuevo objeto
            return true;
        }else{
            return false;
        }
    } catch {
        console.log(error); // Imprimir el error para depuracion
        return false;
    }
}

// =============== CRUD de el cotizador Base ===============