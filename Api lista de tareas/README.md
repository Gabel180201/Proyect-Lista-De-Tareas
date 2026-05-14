# 📋 API de Recordatorios

API CRUD completa para gestionar recordatorios y objetivos con Node.js, Express y MongoDB.

## 🚀 Inicio Rápido

### 1. Instalación de dependencias
```bash
npm install
```

### 2. Configuración del .env
El archivo `.env` ya está configurado con:
- **Puerto**: 5000
- **Base de datos**: MongoDB Atlas (remota)
- **CORS Origin**: http://localhost:3000
- **Credenciales admin**: admin / Admin123!@#

### 3. Iniciar el servidor
```bash
# Modo desarrollo (con auto-recarga)
npm run dev

# O modo producción
npm start
```

El servidor se iniciará en: `http://localhost:5000`

---

## 📊 Estructura del Proyecto
```
Api lista de tareas/
├── config/
│   └── db.js                 # Conexión a MongoDB
├── models/
│   └── Recordatorio.js       # Esquema del modelo
├── controllers/
│   └── recordatoriosController.js  # Lógica CRUD
├── routes/
│   └── recordatorios.js      # Rutas de API
├── middleware/
│   └── errorHandler.js       # Manejo de errores
├── .env                      # Variables de entorno
├── package.json              # Dependencias
├── server.js                 # Servidor principal
├── datos_ejemplo.json        # Datos de ejemplo
└── README.md                 # Este archivo
```

---

## 📡 Endpoints Disponibles

### 🔍 GET - Obtener todos los recordatorios
```http
GET http://localhost:5000/api/recordatorios
```

### 🔍 GET - Obtener un recordatorio específico
```http
GET http://localhost:5000/api/recordatorios/:id
```

### ➕ POST - Crear un nuevo recordatorio
```http
POST http://localhost:5000/api/recordatorios
Content-Type: application/json

{
  "texto": "Mi nuevo recordatorio",
  "fechaVencimiento": "2026-05-15",
  "prioridad": "alta",
  "completado": false
}
```

### ✏️ PUT - Actualizar un recordatorio
```http
PUT http://localhost:5000/api/recordatorios/:id
Content-Type: application/json

{
  "texto": "Recordatorio actualizado",
  "completado": true
}
```

### 🗑️ DELETE - Eliminar un recordatorio
```http
DELETE http://localhost:5000/api/recordatorios/:id
```

### 🔗 Rutas Adicionales de Filtro

**Por Prioridad:**
```http
GET http://localhost:5000/api/recordatorios/filtro/prioridad/alta
GET http://localhost:5000/api/recordatorios/filtro/prioridad/media
GET http://localhost:5000/api/recordatorios/filtro/prioridad/baja
```

**Completados:**
```http
GET http://localhost:5000/api/recordatorios/filtro/completados
```

**Pendientes:**
```http
GET http://localhost:5000/api/recordatorios/filtro/pendientes
```

### ✅ Health Check
```http
GET http://localhost:5000/api/health
```

---

## 📦 Estructura de un Recordatorio

```json
{
  "_id": "607f1f77bcf86cd799439011",
  "texto": "Mi recordatorio",
  "fechaVencimiento": "2026-05-15T00:00:00.000Z",
  "prioridad": "alta",
  "completado": false,
  "fechaCreacion": "2026-04-28T10:30:00.000Z",
  "fechaActualizacion": "2026-04-28T10:30:00.000Z",
  "__v": 0
}
```

---

## 🗄️ Variables de Entorno (.env)

```env
# Servidor
PORT=5000
NODE_ENV=development

# Base de Datos
MONGODB_URI=mongodb+srv://admin_recordatorios:RecordatoriosAPI2024@cluster-recordatorios.mongodb.net/lista_tareas_db

# CORS
CORS_ORIGIN=http://localhost:3000

# Admin
ADMIN_USER=admin
ADMIN_PASSWORD=Admin123!@#

# Otras
LOG_LEVEL=debug
API_VERSION=v1
```

---

## 🔧 Alternativas de Base de Datos

### MongoDB Local (si tienes MongoDB instalado)
```env
MONGODB_URI=mongodb://localhost:27017/lista_tareas_db
```

### Cambiar CORS Origin (si el frontend está en otro puerto)
```env
CORS_ORIGIN=http://localhost:5173  # Para Vite
```

---

## 📝 Validaciones

- **Texto**: Mínimo 3 caracteres, máximo 500
- **Prioridad**: Solo acepta "baja", "media", "alta"
- **Fecha de vencimiento**: Opcional, formato ISO 8601
- **Completado**: Booleano (true/false)

---

## ⚠️ Manejo de Errores

La API devuelve errores en este formato:
```json
{
  "error": {
    "status": 400,
    "mensaje": "Descripción del error",
    "detalles": "Detalles adicionales (solo en desarrollo)"
  }
}
```

---

## 🔌 Conectar con el Frontend

Tu componente React ya está configurado para conectarse a `http://localhost:5000/api/recordatorios`. Solo necesitas:

1. ✅ Instalar dependencias: `npm install`
2. ✅ Iniciar el servidor: `npm run dev`
3. ✅ El frontend se conectará automáticamente

---

## 📚 Ejemplo de Uso (JavaScript/Fetch)

```javascript
// Obtener todos los recordatorios
fetch('http://localhost:5000/api/recordatorios')
  .then(res => res.json())
  .then(data => console.log(data));

// Crear un recordatorio
fetch('http://localhost:5000/api/recordatorios', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    texto: 'Nuevo recordatorio',
    prioridad: 'alta',
    completado: false
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

---

## 🐛 Troubleshooting

**Error: "Cannot find module 'mongoose'"**
```bash
npm install
```

**Error: "MongoDB connection failed"**
- Verifica tu conexión a internet
- Comprueba que MONGODB_URI en .env es correcta
- Asegúrate de que tu IP está en la whitelist de MongoDB Atlas

**CORS Error**
- Verifica que CORS_ORIGIN en .env coincida con tu frontend
- El frontend debe estar en http://localhost:3000

---

## 📞 Contacto & Soporte

Si tienes problemas, verifica:
1. El servidor está corriendo en puerto 5000
2. MongoDB está conectado ✅
3. El .env tiene las credenciales correctas
4. El frontend hace peticiones a http://localhost:5000

¡Listo para usar! 🎉
