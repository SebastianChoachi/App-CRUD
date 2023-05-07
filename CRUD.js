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
    contactos.forEach(function (contacto, index) {
        infoDelHTML += `
        <li class="listado">
        <label>${contacto.nombre}</label>
        <label>${contacto.apellido}</label>
        <br/>
        <label>${contacto.correo}</label> 
        <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="editarContacto(${index})"> Editar </button>
        <button onclick="eliminarContacto(${index})"> Eliminar </button>    
        </li>
         <br/>
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
      contactoActual.nombre = modalNombre.value ;
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
    inputNombre.value = "";
    inputApellido.value = "";
    inputCorreo.value = "";

    /** Se actualiza la lista de contactos */
    contactos.push({
        nombre, apellido, correo
    });
    almacenarInfoContactos(contactos)
    mostrarContactos();
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
