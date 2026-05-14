# 📚 DOCUMENTACIÓN TÉCNICA - API de Recordatorios

## 🎯 Descripción General

API RESTful para gestionar recordatorios y objetivos. Proporciona operaciones CRUD completas con soporte para filtrado, validación de datos y manejo robusto de errores.

**Versión**: 1.0.0  
**Stack**: Node.js + Express + MongoDB (Mongoose)  
**Ambiente**: Development  

---

## 🔑 Datos de Conexión

### Base de Datos
- **Tipo**: MongoDB
- **Host**: mongodb+srv://cluster-recordatorios.mongodb.net
- **Base de datos**: `lista_tareas_db`
- **Usuario**: `admin_recordatorios`
- **Contraseña**: `RecordatoriosAPI2024`

### API Server
- **Host**: localhost
- **Puerto**: 5000
- **Protocolo**: HTTP
- **CORS**: http://localhost:3000

### Credenciales Admin
- **Usuario**: `admin`
- **Contraseña**: `Admin123!@#`

---

## 📦 Modelo de Datos

### Recordatorio
```javascript
{
  _id: ObjectId,                    // ID único generado por MongoDB
  texto: String,                    // Texto del recordatorio (requerido)
  fechaVencimiento: Date,           // Fecha de vencimiento (opcional)
  prioridad: String,                // "baja", "media", "alta" (default: "media")
  completado: Boolean,              // Estado de completación (default: false)
  fechaCreacion: Date,              // Fecha de creación (automático)
  fechaActualizacion: Date,         // Fecha de última actualización (automático)
  __v: Number                       // Versionado de MongoDB
}
```

### Validaciones
| Campo | Validación | Requerido |
|-------|-----------|----------|
| texto | Min 3, Max 500 caracteres | Sí |
| fechaVencimiento | ISO 8601 | No |
| prioridad | enum: ["baja", "media", "alta"] | No |
| completado | boolean | No |

---

## 🔌 Endpoints

### 1. Listar todos los recordatorios
```
GET /api/recordatorios
```

**Parámetros**: Ninguno

**Respuesta (200 OK)**:
```json
[
  {
    "_id": "607f1f77bcf86cd799439011",
    "texto": "Comprar ingredientes",
    "fechaVencimiento": "2026-05-15T00:00:00Z",
    "prioridad": "media",
    "completado": false,
    "fechaCreacion": "2026-04-28T10:30:00Z",
    "fechaActualizacion": "2026-04-28T10:30:00Z"
  }
]
```

**Códigos de respuesta**: 200, 500

---

### 2. Obtener recordatorio por ID
```
GET /api/recordatorios/:id
```

**Parámetros**:
- `id` (string, required): ID de MongoDB

**Respuesta (200 OK)**:
```json
{
  "_id": "607f1f77bcf86cd799439011",
  "texto": "Comprar ingredientes",
  "fechaVencimiento": "2026-05-15T00:00:00Z",
  "prioridad": "media",
  "completado": false,
  "fechaCreacion": "2026-04-28T10:30:00Z",
  "fechaActualizacion": "2026-04-28T10:30:00Z"
}
```

**Respuesta (404 Not Found)**:
```json
{
  "mensaje": "Recordatorio no encontrado"
}
```

**Códigos de respuesta**: 200, 404, 500

---

### 3. Crear nuevo recordatorio
```
POST /api/recordatorios
```

**Content-Type**: application/json

**Body (requerido)**:
```json
{
  "texto": "Mi nuevo recordatorio",
  "fechaVencimiento": "2026-05-20",
  "prioridad": "alta",
  "completado": false
}
```

**Body (mínimo)**:
```json
{
  "texto": "Recordatorio simple"
}
```

**Respuesta (201 Created)**:
```json
{
  "_id": "607f1f77bcf86cd799439012",
  "texto": "Mi nuevo recordatorio",
  "fechaVencimiento": "2026-05-20T00:00:00Z",
  "prioridad": "alta",
  "completado": false,
  "fechaCreacion": "2026-04-28T11:00:00Z",
  "fechaActualizacion": "2026-04-28T11:00:00Z"
}
```

**Respuesta (400 Bad Request)**:
```json
{
  "mensaje": "El texto del recordatorio es requerido"
}
```

**Códigos de respuesta**: 201, 400, 500

---

### 4. Actualizar recordatorio
```
PUT /api/recordatorios/:id
```

**Content-Type**: application/json

**Parámetros**:
- `id` (string, required): ID de MongoDB

**Body (parcial)**:
```json
{
  "completado": true
}
```

O actualizar múltiples campos:
```json
{
  "texto": "Nuevo texto",
  "prioridad": "baja",
  "completado": true
}
```

**Respuesta (200 OK)**:
```json
{
  "_id": "607f1f77bcf86cd799439011",
  "texto": "Nuevo texto",
  "fechaVencimiento": "2026-05-15T00:00:00Z",
  "prioridad": "baja",
  "completado": true,
  "fechaCreacion": "2026-04-28T10:30:00Z",
  "fechaActualizacion": "2026-04-28T12:00:00Z"
}
```

**Respuesta (404 Not Found)**:
```json
{
  "mensaje": "Recordatorio no encontrado"
}
```

**Códigos de respuesta**: 200, 404, 500

---

### 5. Eliminar recordatorio
```
DELETE /api/recordatorios/:id
```

**Parámetros**:
- `id` (string, required): ID de MongoDB

**Respuesta (200 OK)**:
```json
{
  "mensaje": "Recordatorio eliminado exitosamente",
  "recordatorio": {
    "_id": "607f1f77bcf86cd799439011",
    "texto": "Comprar ingredientes",
    "prioridad": "media",
    "completado": false
  }
}
```

**Respuesta (404 Not Found)**:
```json
{
  "mensaje": "Recordatorio no encontrado"
}
```

**Códigos de respuesta**: 200, 404, 500

---

### 6. Obtener por prioridad
```
GET /api/recordatorios/filtro/prioridad/:prioridad
```

**Parámetros**:
- `prioridad` (string, required): "baja", "media" o "alta"

**Respuesta (200 OK)**:
```json
[
  {
    "_id": "607f1f77bcf86cd799439011",
    "texto": "Tarea urgente",
    "prioridad": "alta",
    "completado": false
  }
]
```

**Respuesta (400 Bad Request)**:
```json
{
  "mensaje": "Prioridad inválida. Use: baja, media o alta"
}
```

**Códigos de respuesta**: 200, 400, 500

---

### 7. Obtener completados
```
GET /api/recordatorios/filtro/completados
```

**Respuesta (200 OK)**:
```json
[
  {
    "_id": "607f1f77bcf86cd799439011",
    "texto": "Tarea completada",
    "completado": true
  }
]
```

**Códigos de respuesta**: 200, 500

---

### 8. Obtener pendientes
```
GET /api/recordatorios/filtro/pendientes
```

**Respuesta (200 OK)**:
```json
[
  {
    "_id": "607f1f77bcf86cd799439011",
    "texto": "Tarea pendiente",
    "completado": false
  }
]
```

**Códigos de respuesta**: 200, 500

---

### 9. Eliminar todos (⚠️ PELIGROSO)
```
DELETE /api/recordatorios
```

**Respuesta (200 OK)**:
```json
{
  "mensaje": "Todos los recordatorios han sido eliminados",
  "eliminados": 8
}
```

**Códigos de respuesta**: 200, 500

---

### 10. Health Check
```
GET /api/health
```

**Respuesta (200 OK)**:
```json
{
  "mensaje": "✅ API funcionando correctamente",
  "timestamp": "2026-04-28T11:30:00Z",
  "version": "1.0"
}
```

**Códigos de respuesta**: 200

---

## 🔐 Manejo de Errores

### Formato estándar de error
```json
{
  "error": {
    "status": 400,
    "mensaje": "Descripción del error",
    "detalles": "Detalles adicionales (solo en development)"
  }
}
```

### Códigos de error comunes
| Código | Significado |
|--------|------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado |
| 400 | Bad Request - Datos inválidos |
| 404 | Not Found - Recurso no encontrado |
| 500 | Server Error - Error del servidor |

---

## 🔒 CORS

**Origen permitido**: http://localhost:3000

Si necesitas agregar más orígenes, modifica en `.env`:
```
CORS_ORIGIN=http://localhost:3000,http://localhost:5173,https://tudominio.com
```

---

## 📊 Ejemplos de Uso

### JavaScript/Fetch

**Obtener todos**:
```javascript
fetch('http://localhost:5000/api/recordatorios')
  .then(res => res.json())
  .then(data => console.log(data));
```

**Crear**:
```javascript
fetch('http://localhost:5000/api/recordatorios', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    texto: 'Nuevo recordatorio',
    prioridad: 'alta'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

**Actualizar**:
```javascript
fetch('http://localhost:5000/api/recordatorios/ID_AQUI', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ completado: true })
})
.then(res => res.json())
.then(data => console.log(data));
```

**Eliminar**:
```javascript
fetch('http://localhost:5000/api/recordatorios/ID_AQUI', {
  method: 'DELETE'
})
.then(res => res.json())
.then(data => console.log(data));
```

---

## 🔧 Variables de Entorno (.env)

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://admin_recordatorios:RecordatoriosAPI2024@cluster-recordatorios.mongodb.net/lista_tareas_db
CORS_ORIGIN=http://localhost:3000
ADMIN_USER=admin
ADMIN_PASSWORD=Admin123!@#
LOG_LEVEL=debug
API_VERSION=v1
```

---

## 🚀 Deployment

Para producción:
1. Cambia `NODE_ENV=production` en `.env`
2. Usa un servicio como Heroku, Railway o Render
3. Configura las variables de entorno en el hosting
4. Asegúrate de actualizar `CORS_ORIGIN` con tu dominio

---

## 📈 Performance

- Índices automáticos en MongoDB para `_id` y timestamps
- Ordenamiento por `fechaCreacion` descendente (más recientes primero)
- Validación en cliente y servidor

---

## 📞 Soporte

Verifica estos archivos para más información:
- `README.md` - Guía general
- `INSTRUCCIONES.md` - Pasos de instalación
- `pruebas.rest` - Ejemplos de peticiones

---

**Última actualización**: 28 de Abril de 2026  
**Estado**: ✅ Listo para producción
