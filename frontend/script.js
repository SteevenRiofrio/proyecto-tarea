const API_URL = 'http://localhost:3000/api/tareas';
let editandoTarea = false;

// Elementos del DOM
const tareaForm = document.getElementById('tareaForm');
const tareasList = document.getElementById('tareasList');
const listarTodasBtn = document.getElementById('listarTodas');
const listarPendientesBtn = document.getElementById('listarPendientes');
const cancelarBtn = document.getElementById('cancelar');

// Event listeners
tareaForm.addEventListener('submit', guardarTarea);
listarTodasBtn.addEventListener('click', listarTodasTareas);
listarPendientesBtn.addEventListener('click', listarTareasPendientes);
cancelarBtn.addEventListener('click', cancelarEdicion);

// Funciones principales
async function guardarTarea(e) {
    e.preventDefault();
    
    const descripcion = document.getElementById('descripcion').value;
    const fechaEntrega = document.getElementById('fechaEntrega').value;
    const estado = document.getElementById('estado').value;
    const tareaId = document.getElementById('tareaId').value;
    
    const tarea = {
        descripcion,
        fechaEntrega,
        estado
    };
    
    try {
        let response;
        if (editandoTarea && tareaId) {
            // Actualizar tarea existente
            response = await fetch(`${API_URL}/${tareaId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tarea)
            });
        } else {
            // Crear nueva tarea
            response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tarea)
            });
        }
        
        if (response.ok) {
            alert(editandoTarea ? 'Tarea actualizada exitosamente' : 'Tarea creada exitosamente');
            limpiarFormulario();
            listarTodasTareas(); // Actualizar la lista
        } else {
            const error = await response.json();
            alert('Error: ' + error.error);
        }
    } catch (error) {
        alert('Error de conexión: ' + error.message);
    }
}

async function listarTodasTareas() {
    try {
        const response = await fetch(API_URL);
        const tareas = await response.json();
        mostrarTareas(tareas, 'Todas las Tareas');
    } catch (error) {
        alert('Error al obtener tareas: ' + error.message);
    }
}

async function listarTareasPendientes() {
    try {
        const response = await fetch(`${API_URL}/estado/pendientes`);
        const tareas = await response.json();
        mostrarTareas(tareas, 'Tareas Pendientes');
    } catch (error) {
        alert('Error al obtener tareas pendientes: ' + error.message);
    }
}

function mostrarTareas(tareas, titulo) {
    tareasList.innerHTML = `<h3>${titulo}</h3>`;
    
    if (tareas.length === 0) {
        tareasList.innerHTML += '<p>No hay tareas para mostrar.</p>';
        return;
    }
    
    tareas.forEach(tarea => {
        const fechaFormateada = new Date(tarea.fechaEntrega).toLocaleDateString();
        const estadoClass = tarea.estado.toLowerCase().replace(' ', '-');
        
        const tareaElement = document.createElement('div');
        tareaElement.className = `tarea-item ${estadoClass}`;
        tareaElement.innerHTML = `
            <div>
                <strong>${tarea.descripcion}</strong>
                <span class="estado-badge estado-${estadoClass}">${tarea.estado}</span>
            </div>
            <div>📅 Fecha de entrega: ${fechaFormateada}</div>
            <div class="tarea-actions">
                <button class="edit-btn" onclick="editarTarea(${tarea.id})">✏️ Editar</button>
                <button class="delete-btn" onclick="eliminarTarea(${tarea.id})">🗑️ Eliminar</button>
            </div>
        `;
        tareasList.appendChild(tareaElement);
    });
}

async function editarTarea(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const tarea = await response.json();
        
        // Llenar el formulario con los datos de la tarea
        document.getElementById('tareaId').value = tarea.id;
        document.getElementById('descripcion').value = tarea.descripcion;
        document.getElementById('fechaEntrega').value = tarea.fechaEntrega.split('T')[0];
        document.getElementById('estado').value = tarea.estado;
        
        // Cambiar el estado del formulario
        editandoTarea = true;
        document.querySelector('.form-container h2').textContent = 'Editar Tarea';
        document.querySelector('button[type="submit"]').textContent = 'Actualizar Tarea';
        cancelarBtn.style.display = 'inline-block';
        
        // Scroll al formulario
        document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        alert('Error al cargar tarea: ' + error.message);
    }
}

async function eliminarTarea(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                alert('Tarea eliminada exitosamente');
                listarTodasTareas(); // Actualizar la lista
            } else {
                const error = await response.json();
                alert('Error al eliminar: ' + error.error);
            }
        } catch (error) {
            alert('Error de conexión: ' + error.message);
        }
    }
}

function cancelarEdicion() {
    limpiarFormulario();
}

function limpiarFormulario() {
    tareaForm.reset();
    document.getElementById('tareaId').value = '';
    editandoTarea = false;
    document.querySelector('.form-container h2').textContent = 'Crear Nueva Tarea';
    document.querySelector('button[type="submit"]').textContent = 'Guardar Tarea';
    cancelarBtn.style.display = 'none';
}

// Cargar tareas al iniciar
document.addEventListener('DOMContentLoaded', listarTodasTareas);