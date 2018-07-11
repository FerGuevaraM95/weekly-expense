// VARS
const presupuestoUsuario = prompt('¿Cual es tu presupuesto semanal?');
const formulario = document.querySelector('#agregar-gasto');
let cantidadPresupuesto;

// CLASS
// Clase de presupuesto
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }
    // Método para restar del presupuesto actual
    presupuestoRestante(cantidad = 0) {
        return this.restante -= Number(cantidad);
    }
}


class Interfaz {
    insertarPresupuesto(cantidad) {
        const presupuestoSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');

        // Insetar al Html
        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`;
    }

    // Imprimir mensaje
    imprimirMensaje(mensaje, tipo) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');
        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }
        divMensaje.appendChild(document.createTextNode(mensaje));
        // Insertar en el DOM
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        // Quitar el alert despues de 3 segundos
        setTimeout(function() {
            document.querySelector('.primario .alert').remove();
            formulario.reset();
        }, 3000);
    }

    // Insertar los gastos a la lista
    agregarGastoListado(nombre, cantidad) {
        const gastosListado = document.querySelector('#gastos ul');
        // Crear un LI
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        // Insertar el gasto
        li.innerHTML = `
            ${nombre}
            <span class="badge badge-primary badge-pill">$ ${cantidad}</span>
        `;
        // Insertar al html
        gastosListado.appendChild(li);
    }
    // Comprueba el presupuesto restante
    presupuestoRestante(cantidad) {
        const restante = document.querySelector('span#restante');
        // Leemos el presupuesto restante
        const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);
        // Actualizando el restante
        restante.innerHTML = `${presupuestoRestanteUsuario}`;

        this.comprobarPresupuesto();
    }
    // Cambiar el color del presupuesto restante
    comprobarPresupuesto() {
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;

        // Comprobar el 25%
        if(presupuestoTotal / 4 > presupuestoRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-succes', 'alert-warning');
            restante.classList.add('alert-danger');
        } else if((presupuestoTotal / 2) > presupuestoRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning');
        }
    }
}


// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', function() {
    if(presupuestoUsuario === null || presupuestoUsuario === '') {
        window.location.reload();
    } else {
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        // Instanciar la clase de interfaz
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }
});

formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    // Leer del formulario de gastos
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;
    // Instanciar la interfaz
    const ui = new Interfaz();
    // Comprobar que los campos no esten vacios
    if(nombreGasto === '' || cantidadGasto === '') {
        // Dos parametros: mensaje y tipo
        ui.imprimirMensaje("Hubo un error", "error");
    } else {
        // Insertar en el html
        ui.imprimirMensaje("Gasto agregado correctamente", "correcto");
        ui.agregarGastoListado(nombreGasto, cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
    }
});