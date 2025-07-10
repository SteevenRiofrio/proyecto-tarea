# 📋 Sistema de Gestión de Tareas

## Descripción de la Aplicación

Esta aplicación es un sistema completo de gestión de tareas que permite crear, leer, actualizar y eliminar tareas personales. El sistema está diseñado con una arquitectura REST API y cuenta con una interfaz web intuitiva para la gestión completa de las tareas.

## Entidad Asignada

**Entidad**: `Tarea`

**Atributos**:
- `id` (INTEGER, PRIMARY KEY, AUTO_INCREMENT)
- `descripcion` (STRING, NOT NULL)
- `fechaEntrega` (DATE, NOT NULL)
- `estado` (ENUM: 'Pendiente', 'En Progreso', 'Completada')

**Operación Extra Obligatoria**: Listar tareas pendientes (Estado = "Pendiente")

## Arquitectura y Funcionamiento

### Interacción Frontend-Backend

El **frontend** (HTML/CSS/JavaScript) se comunica con el **backend** (Node.js/Express) a través de peticiones HTTP REST. El frontend consume los endpoints de la API usando `fetch()` para realizar operaciones CRUD. El **backend** procesa las peticiones, interactúa con la base de datos MySQL usando Sequelize ORM, y devuelve respuestas en formato JSON. Esta arquitectura desacoplada permite que el frontend y backend funcionen independientemente, facilitando el mantenimiento y escalabilidad del sistema.

```
┌─────────────────┐    HTTP Requests    ┌─────────────────┐    SQL Queries    ┌─────────────────┐
│                 │ ───────────────────► │                 │ ─────────────────► │                 │
│    Frontend     │                     │    Backend      │                   │   MySQL DB      │
│  (HTML/CSS/JS)  │                     │ (Node.js/Express)│                   │                 │
│                 │ ◄─────────────────── │                 │ ◄───────────────── │                 │
└─────────────────┘    JSON Response    └─────────────────┘    Data Results    └─────────────────┘
```

## Funcionalidades de la API

### Endpoints CRUD Estándar

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/tareas` | Obtener todas las tareas |
| GET | `/api/tareas/:id` | Obtener una tarea específica |
| POST | `/api/tareas` | Crear una nueva tarea |
| PUT | `/api/tareas/:id` | Actualizar una tarea existente |
| DELETE | `/api/tareas/:id` | Eliminar una tarea |

### Endpoint Personalizado

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/tareas/estado/pendientes` | Listar solo las tareas con estado "Pendiente" |

## Pruebas en Postman

### 1. **GET - Listar todas las tareas**
```
URL: http://localhost:3000/api/tareas
Method: GET
Headers: Content-Type: application/json
```

### 2. **POST - Crear nueva tarea**
```
URL: http://localhost:3000/api/tareas
Method: POST
Headers: Content-Type: application/json
Body (JSON):
{
    "descripcion": "Completar proyecto final",
    "fechaEntrega": "2024-12-31",
    "estado": "Pendiente"
}
```

### 3. **GET - Obtener tarea por ID**
```
URL: http://localhost:3000/api/tareas/1
Method: GET
Headers: Content-Type: application/json
```

### 4. **PUT - Actualizar tarea**
```
URL: http://localhost:3000/api/tareas/1
Method: PUT
Headers: Content-Type: application/json
Body (JSON):
{
    "descripcion": "Completar proyecto final - ACTUALIZADO",
    "fechaEntrega": "2024-12-25",
    "estado": "En Progreso"
}
```

### 5. **DELETE - Eliminar tarea**
```
URL: http://localhost:3000/api/tareas/1
Method: DELETE
Headers: Content-Type: application/json
```

### 6. **GET - Listar tareas pendientes (Endpoint Extra)**
```
URL: http://localhost:3000/api/tareas/estado/pendientes
Method: GET
Headers: Content-Type: application/json
```

## Respuestas de la API

### Respuesta Exitosa (Crear Tarea)
```json
{
    "id": 1,
    "descripcion": "Completar proyecto final",
    "fechaEntrega": "2024-12-31T00:00:00.000Z",
    "estado": "Pendiente",
    "createdAt": "2024-07-10T15:30:00.000Z",
    "updatedAt": "2024-07-10T15:30:00.000Z"
}
```

### Respuesta de Error
```json
{
    "error": "Tarea no encontrada"
}
```

## Instalación y Ejecución

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
# Abrir index.html en el navegador
```

## Tecnologías Utilizadas

- **Backend**: Node.js, Express.js, Sequelize, MySQL
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Base de Datos**: MySQL
- **Herramientas**: Postman (para pruebas API)

## Estudiante

**Nombre**: RIOFRIO ZAMBRANO STEEVEN JOEL