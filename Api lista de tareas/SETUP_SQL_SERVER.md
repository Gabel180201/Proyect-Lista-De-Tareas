# 🎯 INSTRUCCIONES PARA SQL SERVER

## ⚡ Pasos rápidos:

### 1️⃣ Crea la BD en SQL Server Management Studio

Abre **SQL Server Management Studio** y ejecuta el archivo:
```
CREAR_BD_SQL_SERVER.sql
```

O copia y pega este script en una Nueva Consulta:

```sql
CREATE DATABASE lista_tareas_db;
GO
USE lista_tareas_db;
GO
CREATE TABLE Recordatorios (
    id INT PRIMARY KEY IDENTITY(1,1),
    texto VARCHAR(500) NOT NULL,
    fechaVencimiento DATETIME NULL,
    prioridad VARCHAR(10) DEFAULT 'media' NOT NULL CHECK (prioridad IN ('baja', 'media', 'alta')),
    completado BIT DEFAULT 0 NOT NULL,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE()
);
GO
```

### 2️⃣ Actualiza las dependencias

```bash
npm install
```

### 3️⃣ Inicia el servidor

```bash
npm run dev
```

El servidor dirá: ✅ **Base de datos SQL Server conectada exitosamente**

### 4️⃣ (Opcional) Carga datos de ejemplo

```bash
npm run seed
```

---

## 🔑 Credenciales configuradas en .env

```
DB_HOST=localhost
DB_PORT=1433
DB_USER=sa
DB_PASSWORD=Admin123456
DB_NAME=lista_tareas_db
```

**Si tus credenciales son diferentes**, edita `.env`:
```env
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
```

---

## ❌ Si tienes error "Connection timeout"

Verifica que:
1. SQL Server está corriendo (Services → SQL Server)
2. El usuario `sa` existe (es el usuario admin de SQL Server)
3. El puerto es 1433 (default de SQL Server)

---

## ✅ Los endpoints siguen siendo los mismos:

```
GET    /api/recordatorios
POST   /api/recordatorios
GET    /api/recordatorios/:id
PUT    /api/recordatorios/:id
DELETE /api/recordatorios/:id
GET    /api/recordatorios/filtro/prioridad/alta
GET    /api/recordatorios/filtro/completados
GET    /api/health
```

---

## 📋 Estructura de la tabla:

```sql
Recordatorios
├── id (INT, PK, Auto-increment)
├── texto (VARCHAR 500, No Null)
├── fechaVencimiento (DATETIME, Nullable)
├── prioridad (VARCHAR 10, Default: 'media')
├── completado (BIT, Default: 0)
├── createdAt (DATETIME, Auto)
└── updatedAt (DATETIME, Auto)
```

---

## 🧪 Prueba la API

Una vez todo conectado:

```bash
curl http://localhost:5000/api/health
```

Deberías ver:
```json
{
  "mensaje": "✅ API funcionando correctamente",
  "bd": "SQL Server"
}
```

---

## 📚 Archivos importantes:

- `.env` → Credenciales SQL Server
- `CREAR_BD_SQL_SERVER.sql` → Script para crear BD
- `server.js` → Servidor (conecta con Sequelize)
- `models/Recordatorio.js` → Modelo SQL Server
- `controllers/recordatoriosController.js` → Lógica CRUD

¡Listo! 🚀
