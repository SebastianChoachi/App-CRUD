/** se crea la variable "global" para guardar los datos deseados */
let contactos = [];

/** se declaran los elementos de mmi Html */
const inputNombre = document.getElementById('nombre');
const inputApellido = document.getElementById('apellido');
const inputCorreo = document.getElementById('correo');
const btnGuardar = document.getElementById('btnGuardar');
const listaDeContactos = document.getElementById('listaDeContactos');





/** PARA MOSTRAR */
function mostrarContactos() {
    let infoDelHTML = '';
    contactos.forEach(function (contacto) {
        infoDelHTML += `
        <li class="listado">
        <label>${contacto.nombre}</label>
        <label>${contacto.apellido}</label>
        <br/>
        <label>${contacto.correo}</label> 
        <button onclick="alert('EditarUsuario')"> Editar </button>
        <button onclick="alert('EliminarUsuario')"> Eliminar </button>    
        </li>
         <br/>
        `;
    });
    listaDeContactos.innerHTML = infoDelHTML
}






/** PARA CREAR O GUARDAR */

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

btnGuardar.addEventListener('click', guardarContacto)





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
