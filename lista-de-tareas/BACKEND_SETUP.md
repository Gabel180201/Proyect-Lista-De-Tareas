# 🚀 GUÍA: Backend, API CRUD y Base de Datos para Recordatorios

## 📋 Estructura del Proyecto Backend

```
backend/
├── server.js                 # Servidor principal
├── package.json
├── .env                     # Variables de entorno
└── routes/
    └── recordatorios.js     # Rutas del CRUD
└── models/
    └── Recordatorio.js      # Modelo de base de datos
```

---

## 🗄️ MODELO DE BASE DE DATOS (MongoDB)

### Esquema: Recordatorio

```javascript
{
  _id: ObjectId,
  texto: String,              // El contenido del recordatorio
  fechaVencimiento: Date,     // Fecha opcional para vencer
  prioridad: String,          // "baja", "media", "alta"
  completado: Boolean,        // Estado de la tarea
  fechaCreacion: Date,        // Cuándo se creó
  fechaActualizacion: Date    // Última vez que se modificó
}
```

---

## 🛠️ ENDPOINTS API (RESTful)

El frontend hace llamadas a estos endpoints:

### CREATE - POST
```
POST http://localhost:5000/api/recordatorios
Body: {
  "texto": "Hacer compras",
  "fechaVencimiento": "2026-05-15",
  "prioridad": "alta",
  "completado": false
}
Response: { "id": "...", "texto": "...", ... }
```

### READ - GET
```
GET http://localhost:5000/api/recordatorios
Response: [{ "id": "...", "texto": "..." }, ...]

GET http://localhost:5000/api/recordatorios/:id
Response: { "id": "...", "texto": "..." }
```

### UPDATE - PUT
```
PUT http://localhost:5000/api/recordatorios/:id
Body: {
  "completado": true
  // O cualquier otro campo a actualizar
}
Response: { "id": "...", "texto": "...", "completado": true }
```

### DELETE - DELETE
```
DELETE http://localhost:5000/api/recordatorios/:id
Response: { "mensaje": "Recordatorio eliminado" }
```

---

## 🔧 EJEMPLO: Implementación con Node.js + Express + MongoDB

### 1. package.json
```json
{
  "name": "recordatorios-api",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3"
  },
  "devDependencies": {
    "nodemon": "^2.0.20"
  }
}
```

### 2. server.js (Servidor Express)
```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión:'));
db.once('open', () => console.log('✅ Conectado a MongoDB'));

// Rutas
const recordatoriosRoutes = require('./routes/recordatorios');
app.use('/api/recordatorios', recordatoriosRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
```

### 3. models/Recordatorio.js (Esquema Mongoose)
```javascript
const mongoose = require('mongoose');

const recordatorioSchema = new mongoose.Schema({
  texto: {
    type: String,
    required: true,
  },
  fechaVencimiento: {
    type: Date,
    default: null,
  },
  prioridad: {
    type: String,
    enum: ['baja', 'media', 'alta'],
    default: 'media',
  },
  completado: {
    type: Boolean,
    default: false,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Recordatorio', recordatorioSchema);
```

### 4. routes/recordatorios.js (CRUD completo)
```javascript
const express = require('express');
const router = express.Router();
const Recordatorio = require('../models/Recordatorio');

// READ - Obtener todos
router.get('/', async (req, res) => {
  try {
    const recordatorios = await Recordatorio.find().sort({ fechaCreacion: -1 });
    res.json(recordatorios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - Obtener por ID
router.get('/:id', async (req, res) => {
  try {
    const recordatorio = await Recordatorio.findById(req.params.id);
    if (!recordatorio) {
      return res.status(404).json({ error: 'Recordatorio no encontrado' });
    }
    res.json(recordatorio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE - Crear nuevo
router.post('/', async (req, res) => {
  try {
    const nuevoRecordatorio = new Recordatorio(req.body);
    const guardado = await nuevoRecordatorio.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE - Actualizar
router.put('/:id', async (req, res) => {
  try {
    const recordatorio = await Recordatorio.findByIdAndUpdate(
      req.params.id,
      { ...req.body, fechaActualizacion: new Date() },
      { new: true }
    );
    if (!recordatorio) {
      return res.status(404).json({ error: 'Recordatorio no encontrado' });
    }
    res.json(recordatorio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE - Eliminar
router.delete('/:id', async (req, res) => {
  try {
    const recordatorio = await Recordatorio.findByIdAndDelete(req.params.id);
    if (!recordatorio) {
      return res.status(404).json({ error: 'Recordatorio no encontrado' });
    }
    res.json({ mensaje: 'Recordatorio eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

### 5. .env (Variables de entorno)
```
MONGO_URI=mongodb://localhost:27017/recordatorios-db
PORT=5000
NODE_ENV=development
```

---

## 📦 INSTALACIÓN Y EJECUCIÓN

### Backend:
```bash
# Crear carpeta backend
mkdir backend
cd backend

# Inicializar proyecto
npm init -y

# Instalar dependencias
npm install express mongoose cors dotenv
npm install -D nodemon

# Ejecutar
npm run dev  # Con nodemon para auto-reload
```

### Base de datos MongoDB:
```bash
# Opción 1: Instalación local
# Descargar desde https://www.mongodb.com/try/download/community

# Opción 2: MongoDB Atlas (Cloud - Recomendado)
# 1. Ir a https://www.mongodb.com/cloud/atlas
# 2. Crear una cuenta gratuita
# 3. Crear un cluster
# 4. Obtener la URL de conexión
# 5. Actualizar MONGO_URI en .env
```

---

## 🔄 Flujo Completo

1. **Frontend** (React) → Hace petición HTTP
2. **Backend** (Express) → Recibe la petición
3. **Base de datos** (MongoDB) → Guarda/obtiene datos
4. **Backend** → Envía respuesta
5. **Frontend** → Actualiza la UI

---

## 🧪 Prueba con Postman o cURL

```bash
# Crear un recordatorio
curl -X POST http://localhost:5000/api/recordatorios \
  -H "Content-Type: application/json" \
  -d '{"texto":"Mi recordatorio","prioridad":"alta"}'

# Obtener todos
curl http://localhost:5000/api/recordatorios

# Actualizar
curl -X PUT http://localhost:5000/api/recordatorios/ID_AQUI \
  -H "Content-Type: application/json" \
  -d '{"completado":true}'

# Eliminar
curl -X DELETE http://localhost:5000/api/recordatorios/ID_AQUI
```

---

## 📌 IMPORTANTE

- El frontend ya está configurado para usar `http://localhost:5000/api/recordatorios`
- Si no tienes backend, usa **localStorage** (ya configurado como fallback)
- Cuando tengas el backend listo, solo cambia `API_URL` en `objetivo.js`

¿Necesitas ayuda con el backend o la BD?
