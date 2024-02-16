function pandur() {
    // Obtener los valores del formulario
    let tipo = document.getElementById("tipoInput").value.trim();
    let precio = document.getElementById("precioInput").value.trim();
    let cantidad = document.getElementById("cantidadInput").value.trim();

    // Verificar si alguna de las celdas está vacía
    if (tipo === '' || precio === '' || cantidad === '') {
        alert("Por favor, completa todos los campos del formulario.");
        return; // Salir de la función si hay campos vacíos
    }

    // Crear el objeto con los datos del formulario
    let obj = {Tipo: tipo, Precio: precio, Cantidad: cantidad};

    // Agregar la fila a la tabla
    agregarFilaATabla(obj);

    // Limpiar el formulario
    document.getElementById("form").reset();
}

function agregarFilaATabla(obj) {
    // Obtener la tabla
    let tabla = document.getElementById('tablaTortas').getElementsByTagName('tbody')[0];

    // Crear una nueva fila en la tabla
    let fila = tabla.insertRow();

    // Insertar las celdas con los datos del objeto
    let celdaTipo = fila.insertCell(0);
    let celdaPrecio = fila.insertCell(1);
    let celdaCantidad = fila.insertCell(2);
    let celdaOperaciones = fila.insertCell(3);

    // Asignar los valores del objeto a las celdas correspondientes
    celdaTipo.textContent = obj.Tipo;
    celdaPrecio.textContent = obj.Precio;
    celdaCantidad.textContent = obj.Cantidad;

    // Agregar botones de operaciones a la última celda
    celdaOperaciones.innerHTML = '<button class="btn btn-danger" onclick="eliminarFila(this)"><i class="bi bi-trash"></i></button><button class="btn btn-danger" onclick="editarFila(this)"><i class="bi bi-pencil-square"></i></button>';
}

function eliminarFila(boton) {
    // Obtener la fila que contiene el botón
    let fila = boton.closest('tr');
    // Eliminar la fila de la tabla
    fila.remove();
}

function editarFila(boton) {
    // Obtener la fila que contiene el botón
    let fila = boton.closest('tr');

    // Obtener los valores de la fila
    let tipo = fila.cells[0].textContent;
    let precio = fila.cells[1].textContent;
    let cantidad = fila.cells[2].textContent;

    // Llenar el formulario con los valores de la fila
    document.getElementById("tipoInput").value = tipo;
    document.getElementById("precioInput").value = precio;
    document.getElementById("cantidadInput").value = cantidad;

    // Cambiar el texto del botón enviar a guardar
    let enviarBtn = document.getElementById("enviarBtn");
    enviarBtn.textContent = "Guardar";

    // Agregar un listener al botón para guardar los cambios
    enviarBtn.onclick = function() {
        // Obtener los nuevos valores del formulario
        let nuevoTipo = document.getElementById("tipoInput").value.trim();
        let nuevoPrecio = document.getElementById("precioInput").value.trim();
        let nuevaCantidad = document.getElementById("cantidadInput").value.trim();

        // Verificar si alguna de las celdas está vacía
        if (nuevoTipo === '' || nuevoPrecio === '' || nuevaCantidad === '') {
            alert("Por favor, completa todos los campos del formulario.");
            return; // Salir de la función si hay campos vacíos
        }

        // Actualizar los valores en la fila de la tabla
        fila.cells[0].textContent = nuevoTipo;
        fila.cells[1].textContent = nuevoPrecio;
        fila.cells[2].textContent = nuevaCantidad;

        // Resetear el formulario y cambiar el texto del botón enviar
        document.getElementById("form").reset();
        enviarBtn.textContent = "Enviar";
        enviarBtn.onclick = pandur; // Restaurar la función original
    };
}

