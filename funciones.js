// Array para almacenar los datos de las tortas
let tortas = [];

function pandur() {
    // Obtener los valores del formulario
    let tipo = document.getElementById("tipoInput").value.trim();
    let precio = document.getElementById("precioInput").value.trim();
    let cantidad = document.getElementById("cantidadInput").value.trim();
    let salsa = obtenerSalsaSeleccionada();
    let picor = obtenerPicorSeleccionado();
    let plato = document.getElementById("sl1").value;

    // Verificar si alguna de las celdas está vacía
    if (tipo === '' || precio === '' || cantidad === '') {
        alert("Por favor, completa todos los campos del formulario.");
        return; // Salir de la función si hay campos vacíos
    }

    // Crear el objeto con los datos del formulario
    let obj = {
        Tipo: tipo,
        Precio: precio,
        Cantidad: cantidad,
        Salsa: salsa,
        Picor: picor,
        Plato: plato
    };

    // Agregar el objeto al array de tortas
    tortas.push(obj);

    // Renderizar la tabla y la lista
    renderizarTabla();
    renderizarLista();

    // Limpiar el formulario
    document.getElementById("form").reset();
}

// Función para obtener la salsa seleccionada
function obtenerSalsaSeleccionada() {
    let salsaSeleccionada = '';
    let checkboxes = document.querySelectorAll('input[type="checkbox"][name="salsa"]');
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            salsaSeleccionada = checkbox.value;
        }
    });
    return salsaSeleccionada;
}

// Función para obtener el picor seleccionado
function obtenerPicorSeleccionado() {
    let radios = document.getElementsByName('Picor');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
    return '';
}

//Cancelar, o limpiar el formulario, tuneado triple trueno relámpago carmesí anticristo 2009
function limpiarFormulario() {
    // Limpiar el formulario
    document.getElementById("form").reset();

    // Restaurar el botón enviar y su función original
    let enviarBtn = document.getElementById("enviarBtn");
    enviarBtn.textContent = 'Enviar';
    enviarBtn.onclick = pandur;
}

// Obtener el botón de cancelar
let cancelarBtn = document.getElementById('cancelarBtn');

// Agregar un evento clic al botón de cancelar
cancelarBtn.addEventListener('click', limpiarFormulario);

function eliminarFila(index) {
    // Mostrar un cuadro de diálogo de confirmación
    let confirmacion = confirm("¿Estás seguro de que quieres eliminar esta fila?");
    
    // Verificar si el usuario ha confirmado la eliminación
    if (confirmacion) {
        // Eliminar el objeto del array de tortas
        tortas.splice(index, 1);

        // Renderizar la tabla y la lista
        renderizarTabla();
        renderizarLista();
    }
}

function editarFila(index) {
    // Obtener la torta a editar del array
    let torta = tortas[index];

    // Llenar el formulario con los datos de la torta seleccionada
    document.getElementById("tipoInput").value = torta.Tipo;
    document.getElementById("precioInput").value = torta.Precio;
    document.getElementById("cantidadInput").value = torta.Cantidad;

    // Marcar la salsa seleccionada
    let checkboxes = document.querySelectorAll('input[type="checkbox"][name="salsa"]');
    checkboxes.forEach(checkbox => {
        if (checkbox.value === torta.Salsa) {
            checkbox.checked = true;
        } else {
            checkbox.checked = false;
        }
    });

    // Marcar el picor seleccionado
    let radios = document.getElementsByName('Picor');
    radios.forEach(radio => {
        if (radio.value === torta.Picor) {
            radio.checked = true;
        }
    });

    // Seleccionar el tipo de plato
    document.getElementById("sl1").value = torta.Plato;

    // Cambiar el texto del botón enviar a 'Actualizar' y cambiar su función
    let enviarBtn = document.getElementById("enviarBtn");
    enviarBtn.textContent = 'Actualizar';
    enviarBtn.onclick = function() {
        // Obtener los nuevos valores del formulario
        let tipo = document.getElementById("tipoInput").value.trim();
        let precio = document.getElementById("precioInput").value.trim();
        let cantidad = document.getElementById("cantidadInput").value.trim();
        let salsa = obtenerSalsaSeleccionada();
        let picor = obtenerPicorSeleccionado();
        let plato = document.getElementById("sl1").value;

        // Verificar si alguna de las celdas está vacía
        if (tipo === '' || precio === '' || cantidad === '') {
            alert("Por favor, completa todos los campos del formulario.");
            return; // Salir de la función si hay campos vacíos
        }

        // Actualizar los datos de la torta en el array
        torta.Tipo = tipo;
        torta.Precio = precio;
        torta.Cantidad = cantidad;
        torta.Salsa = salsa;
        torta.Picor = picor;
        torta.Plato = plato;

        // Renderizar la tabla y la lista
        renderizarTabla();
        renderizarLista();

        // Restaurar el formulario y el botón enviar
        document.getElementById("form").reset();
        enviarBtn.textContent = 'Enviar';
        enviarBtn.onclick = pandur;
    };
}

function renderizarTabla() {
    // Obtener la tabla
    let tabla = document.getElementById('tablaTortas').getElementsByTagName('tbody')[0];

    // Limpiar la tabla
    tabla.innerHTML = '';

    // Recorrer el array de tortas y agregar filas a la tabla
    tortas.forEach((torta, index) => {
        // Crear una nueva fila en la tabla
        let fila = tabla.insertRow();

        // Insertar las celdas con los datos del objeto
        let celdaTipo = fila.insertCell(0);
        let celdaPrecio = fila.insertCell(1);
        let celdaCantidad = fila.insertCell(2);
        let celdaSalsa = fila.insertCell(3);
        let celdaPicor = fila.insertCell(4);
        let celdaPlato = fila.insertCell(5);
        let celdaOperaciones = fila.insertCell(6);

        // Asignar los valores del objeto a las celdas correspondientes
        celdaTipo.textContent = torta.Tipo;
        celdaPrecio.textContent = torta.Precio;
        celdaCantidad.textContent = torta.Cantidad;
        celdaSalsa.textContent = torta.Salsa;
        celdaPicor.textContent = torta.Picor;
        celdaPlato.textContent = torta.Plato;

        // Crear los botones de eliminar y editar
        let botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.className = 'btn btn-danger';
        botonEliminar.onclick = function() {
            eliminarFila(index);
        };

        let botonEditar = document.createElement('button');
        botonEditar.textContent = 'Editar';
        botonEditar.className = 'btn btn-warning'; // Cambia a tu clase de estilo para editar
        botonEditar.onclick = function() {
            editarFila(index);
        };

        // Agregar los botones a la celda de operaciones
        celdaOperaciones.appendChild(botonEliminar);
        celdaOperaciones.appendChild(botonEditar);
    });
}

function renderizarLista() {
    // Obtener la lista de tortas
    let lista = document.getElementById('listaTortas');

    // Limpiar la lista
    lista.innerHTML = '';

    // Recorrer el array de tortas y agregar elementos a la lista
    tortas.forEach(torta => {
        // Crear un elemento de lista
        let elemento = document.createElement('li');
        elemento.className = 'list-group-item';

        // Crear contenido para el elemento de lista
        elemento.textContent = `Tipo: ${torta.Tipo}, Precio: ${torta.Precio}, Cantidad: ${torta.Cantidad}, Salsa: ${torta.Salsa}, Picor: ${torta.Picor}, Plato: ${torta.Plato}`;

        // Agregar el elemento de lista a la lista
        lista.appendChild(elemento);
    });
}

function toggleSidebar() {
    var sidebar = document.getElementById("mySidebar");
    

    if (sidebar.style.width === "250px") {
        sidebar.style.width = "0";
        
    } else {
        sidebar.style.width = "250px";
        
    }
}

function changeView(viewId) {
    // Ocultar todos los divs
    var views = document.querySelectorAll('.view');
    views.forEach(view => {
        view.style.display = 'none';
    });

    // Mostrar el div correspondiente al ID pasado como argumento
    var targetView = document.getElementById(viewId);
    if (targetView) {
        targetView.style.display = 'block';
    }
}

// Obtener los elementos del sidebar
var sidebarLinks = document.querySelectorAll('.sidebar a');

// Recorrer todos los elementos del sidebar y agregar un evento clic a cada uno
sidebarLinks.forEach(link => {
    link.addEventListener('click', function() {
        // Eliminar la clase 'selected' de todas las opciones del sidebar
        sidebarLinks.forEach(link => {
            link.classList.remove('selected');
        });
        
        // Agregar la clase 'selected' solo a la opción seleccionada
        this.classList.add('selected');
    });
});

//No permitir 2 items seleccionados en los checkbox
const checkboxes = document.querySelectorAll('input[type="checkbox"][name="salsa"]');

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    checkboxes.forEach(cb => {
      if (cb !== this) {
        cb.checked = false;
      }
    });
  });
});
