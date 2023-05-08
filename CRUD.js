/** se crea la variable "global" para guardar los datos deseados */
let contactos = [];

/** se declaran los elementos de mmi Html */
const inputNombre = document.getElementById('nombre');
const inputApellido = document.getElementById('apellido');
const inputCorreo = document.getElementById('correo');
const btnGuardar = document.getElementById('btnGuardar');
const listaDeContactos = document.getElementById('listaDeContactos');





/** PARA MOSTRAR --------------------------------------------------------------------------------------------------------------*/
function mostrarContactos() {
    let infoDelHTML = '';
    let alert = document.getElementById('noContactos');
    if (contactos.length === 0) {
        let infoDelHTML = '';
        infoDelHTML = `
        <div class="alert alert-info alert-dismissible fade show" role="alert">
             No tienes contactos.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      
        `;
        alert.innerHTML = infoDelHTML

    }
    
    contactos.forEach(function (contacto, index) {
        infoDelHTML += `
        <li class=" ligrid">
        <label>${contacto.nombre}</label>
        <label>${contacto.apellido}</label>
        <label>${contacto.correo}</label>
        <div class="d-grid gap-2 d-md-flex justify-content-md-center">
            <button class="btn btn-outline-primary me-md-2 " data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="editarContacto(${index})"> 
                <img src="./img/pencil-fill.svg"> 
            </button>
            <button class="btn  btn-outline-danger" onclick="eliminarContacto(${index})"> 
                <img src="./img/trash3-fill.svg"> 
            </button>   
        </div> 
        </li>
      
        `;
    });
    listaDeContactos.innerHTML = infoDelHTML

}



/** PARA ELIMINAR --------------------------------------------------------------------------------------------------------------*/
function eliminarContacto(index) {
    contactos.splice(index, 1);
    almacenarInfoContactos(contactos);
    mostrarContactos();
}



/** PARA EDITAR ---------------------------------------------------------------------------------------------------------------*/
let indiceContactoActual = -1; // Valor inicial para indicar que no se ha seleccionado ningún contacto

function obtenerContactoActual() {
    if (indiceContactoActual >= 0 && indiceContactoActual < contactos.length) {
        return contactos[indiceContactoActual];
    }
    return null;
}

function modificarContacto() {
    const contactoActual = obtenerContactoActual();
    if (contactoActual) {
        const modalNombre = document.getElementById('modal-nombre');
        const modalApellido = document.getElementById('modal-apellido');
        const modalCorreo = document.getElementById('modal-correo');
        contactoActual.nombre = modalNombre.value;
        contactoActual.apellido = modalApellido.value;
        contactoActual.correo = modalCorreo.value;

        contactos[indiceContactoActual] = {
            ...contactos[indiceContactoActual],
            ...contactoActual,
        };
        almacenarInfoContactos(contactos);
        mostrarContactos();

    }
}
/** Se agrega un evento show.bs.modal al modal para que cada vez que se muestre, se llame a la función 
 * "modificarContacto()" y actualice los valores del modal con el contacto actual */
const modal = document.getElementById('btnModificar');
modal.addEventListener('click', modificarContacto);

/** Modifica la función editarContacto(index) para guardar el índice del contacto seleccionado en la 
 * variable indiceContactoActual antes de mostrar el modal */
function editarContacto(index) {
    indiceContactoActual = index;
    const contactoActual = obtenerContactoActual();
    if (contactoActual) {
        const modalNombre = document.getElementById('modal-nombre');
        const modalApellido = document.getElementById('modal-apellido');
        const modalCorreo = document.getElementById('modal-correo');
        modalNombre.value = contactoActual.nombre;
        modalApellido.value = contactoActual.apellido;
        modalCorreo.value = contactoActual.correo;
    }
}




/** PARA CREAR O GUARDAR ------------------------------------------------------------------------------------------------------------*/

function guardarContacto() {
    /**se obtienen los datos ingresados */
    const nombre = inputNombre.value;
    const apellido = inputApellido.value;
    const correo = inputCorreo.value;
    if (nombre && apellido && correo) {
        inputNombre.value = "";
        inputApellido.value = "";
        inputCorreo.value = "";

        /** Se actualiza la lista de contactos */
        contactos.push({
            nombre, apellido, correo
        });
        almacenarInfoContactos(contactos)
        mostrarContactos();
    } else {
        let alert = document.getElementById('alertInfo');
        let infoDelHTML = '';
        infoDelHTML += `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Oops!</strong> Escriba algo por favor.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      
        `;
        alert.innerHTML = infoDelHTML
    }
}

btnGuardar.addEventListener('click', guardarContacto);



/** Local Storage */

function almacenarInfoContactos(arrayDeContactos) {
    const listaDeContactosConvertidosEnString = JSON.stringify(arrayDeContactos);
    localStorage.setItem('contactos', listaDeContactosConvertidosEnString);
}

function obtenerContactosGuardados() {
    const listaDeContactosEnString = localStorage.getItem('contactos') || '[]'; /** Se pone " || '[]' " para que cuando contactos no exista, ponga un array en cadena */
    const listaDeContactosConvertidaEnArrayDeNuevo = JSON.parse(listaDeContactosEnString);
    contactos = [...listaDeContactosConvertidaEnArrayDeNuevo];
}


obtenerContactosGuardados();
mostrarContactos();
