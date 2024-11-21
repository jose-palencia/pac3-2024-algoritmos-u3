const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');

cargarEventListener();

let articulosCarrito = [];

function cargarEventListener() {
    listaCursos.addEventListener('click', agregarCurso);

    vaciarCarrito.addEventListener('click', borrarCursos);

    carrito.addEventListener('click', eliminarCurso);
}

// Funciones
function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);

    if(existe) {
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso];
        // articulosCarrito.push(infoCurso);
    }

    carritoHTML();
}

function carritoHTML() {
    limpiarCarrito();
   
    articulosCarrito.forEach(({titulo, imagen, precio, cantidad, id}) => {
        
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src='${imagen}' width=100 />
        </td>
        <td>
            ${titulo}
        </td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}" > X </a>
        </td>
        `;
        console.log(row);
        
        contenedorCarrito.appendChild(row);
        
    });

    console.log(contenedorCarrito);
    

}

function limpiarCarrito() {
    // Forma lenta
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML();
    }
}

function borrarCursos() {
    articulosCarrito = [];
    carritoHTML();
}