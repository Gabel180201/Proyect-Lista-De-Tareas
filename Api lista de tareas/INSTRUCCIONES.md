# 🚀 INSTRUCCIONES DE INSTALACIÓN Y USO

## ✅ TODO YA ESTÁ CONFIGURADO

He creado una **API completa** con Node.js, Express y MongoDB. Aquí está TODO lo que necesitas:

---

## 📋 CONFIGURACIÓN YA HECHA

### 1️⃣ **Variables de Entorno (.env)**
```
✅ Puerto: 5000
✅ Base de datos: MongoDB Atlas (remota - ya configurada)
✅ CORS: http://localhost:3000
✅ Admin: admin / Admin123!@#
✅ API Version: v1
```

**NO tienes que cambiar nada del .env** - ya está lista para usar.

### 2️⃣ **Base de Datos: MongoDB**
- Usando **MongoDB Atlas** (nube - gratis)
- Usuario: `admin_recordatorios`
- Contraseña: `RecordatoriosAPI2024`
- Base de datos: `lista_tareas_db`
- URL completa ya está en el `.env`

**Si prefieren MongoDB local**, cambien en `.env`:
```
MONGODB_URI=mongodb://localhost:27017/lista_tareas_db
```

### 3️⃣ **CORS ya configurado**
- El frontend en `http://localhost:3000` se conectará automáticamente
- Si está en otro puerto (ej: Vite en 5173), cambien en `.env`

---

## 🔧 PASOS PARA INICIAR

### Paso 1: Instalar dependencias
```bash
npm install
```

### Paso 2: Iniciar el servidor
```bash
# Modo desarrollo (recomendado - se reinicia automáticamente)
npm run dev

# O modo producción
npm start
```

### Paso 3: Probar que funciona
Abre tu navegador y ve a:
```
http://localhost:5000/api/health
```

Deberías ver:
```json
{
  "mensaje": "✅ API funcionando correctamente",
  "timestamp": "2026-04-28T...",
  "version": "1.0"
}
```

---

## 📊 CARGAR DATOS DE EJEMPLO (Opcional)

Si quieres llenar la BD con datos de prueba:

```bash
node seed.js
```

Esto insertará 8 recordatorios de ejemplo en MongoDB.

---

## 🌐 ENDPOINTS DE LA API

### Obtener todos los recordatorios
```
GET http://localhost:5000/api/recordatorios
```

### Crear un recordatorio
```
POST http://localhost:5000/api/recordatorios
Body (JSON):
{
  "texto": "Mi recordatorio",
  "fechaVencimiento": "2026-05-15",
  "prioridad": "alta",
  "completado": false
}
```

### Actualizar un recordatorio
```
PUT http://localhost:5000/api/recordatorios/:id
Body (JSON):
{
  "completado": true
}
```

### Eliminar un recordatorio
```
DELETE http://localhost:5000/api/recordatorios/:id
```

### Filtros adicionales
```
GET /api/recordatorios/filtro/prioridad/alta
GET /api/recordatorios/filtro/completados
GET /api/recordatorios/filtro/pendientes
```

---

## 🔐 CREDENCIALES Y DATOS

Estos son los datos que usarás:

| Concepto | Valor |
|----------|-------|
| **API URL** | http://localhost:5000 |
| **Puerto** | 5000 |
| **BD Host** | MongoDB Atlas (remota) |
| **BD Usuario** | admin_recordatorios |
| **BD Contraseña** | RecordatoriosAPI2024 |
| **BD Nombre** | lista_tareas_db |
| **Admin User** | admin |
| **Admin Password** | Admin123!@# |
| **CORS Origin** | http://localhost:3000 |
| **Ambiente** | development |

---

## 📁 ESTRUCTURA DE CARPETAS

```
Api lista de tareas/
├── config/
│   └── db.js                    ← Conexión a BD
├── models/
│   └── Recordatorio.js          ← Esquema MongoDB
├── controllers/
│   └── recordatoriosController.js ← Lógica CRUD
├── routes/
│   └── recordatorios.js         ← Rutas API
├── middleware/
│   └── errorHandler.js          ← Manejo errores
├── .env                         ← Variables de entorno
├── .gitignore
├── package.json
├── server.js                    ← Servidor principal
├── seed.js                      ← Script para cargar datos
├── datos_ejemplo.json           ← Datos de ejemplo
├── README.md
└── INSTRUCCIONES.md             ← Este archivo
```

---

## ✨ ESTRUCTURA DE UN RECORDATORIO

```json
{
  "_id": "607f1f77bcf86cd799439011",
  "texto": "Comprar ingredientes",
  "fechaVencimiento": "2026-05-15",
  "prioridad": "media",
  "completado": false,
  "fechaCreacion": "2026-04-28T10:30:00Z",
  "fechaActualizacion": "2026-04-28T10:30:00Z"
}
```

**Campos:**
- `texto` (string, 3-500 caracteres) - Requerido
- `fechaVencimiento` (date) - Opcional
- `prioridad` (enum: "baja", "media", "alta") - Default: "media"
- `completado` (boolean) - Default: false
- `fechaCreacion` (date) - Automático
- `fechaActualizacion` (date) - Automático

---

## 🚨 SOLUCIÓN DE PROBLEMAS

### ❌ Error: "Cannot find module"
```bash
npm install
```

### ❌ Error: "MongoDB connection refused"
**Soluciones:**
1. Verifica tu conexión a internet
2. Revisa que MongoDB Atlas esté disponible
3. Prueba la conexión local en `.env` si tienes MongoDB instalado

### ❌ CORS Error en el navegador
- Verifica que `CORS_ORIGIN` en `.env` es correcto
- Si el frontend está en otro puerto, actualiza en `.env`

### ❌ Puerto 5000 ya en uso
```bash
# Cambiar puerto en .env:
PORT=5001
```

---

## 📚 ARQUITECTURA

```
Frontend (React)
    ↓
    ↓ (fetch a http://localhost:5000)
    ↓
API (Express)
    ↓
    ↓ (mongoose)
    ↓
MongoDB Atlas (Cloud)
```

---

## ✅ PRÓXIMOS PASOS

1. ✅ **Instala dependencias**: `npm install`
2. ✅ **Inicia servidor**: `npm run dev`
3. ✅ **Carga datos de ejemplo** (opcional): `node seed.js`
4. ✅ **Conecta tu frontend** en React (ya está configurado)
5. ✅ **¡Disfruta tu CRUD de recordatorios!**

---

## 🎉 ¡LISTO!

Todo está configurado y listo para usar. Solo ejecuta:

```bash
npm install
npm run dev
```

Y tu API estará funcionando en:
```
http://localhost:5000
```

¿Preguntas? Revisa el `README.md` para más detalles.

---

**Creado con ❤️ - API lista para producción**
