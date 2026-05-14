# ⚡ INICIO RÁPIDO (2 minutos)

## 🎯 Solo 3 comandos para empezar:

### 1️⃣ Instalar
```bash
npm install
```

### 2️⃣ Iniciar
```bash
npm run dev
```

### 3️⃣ Verificar
Abre: http://localhost:5000/api/health

---

## ✅ ¡Hecho! Tu API está corriendo.

---

## 📋 Datos de Configuración

| Dato | Valor |
|------|-------|
| API | http://localhost:5000 |
| Puerto | 5000 |
| BD | MongoDB Atlas (ya configurada) |
| Usuario BD | admin_recordatorios |
| Contraseña BD | RecordatoriosAPI2024 |
| CORS | http://localhost:3000 |

---

## 🧪 Pruebar la API

### Obtener todos
```bash
curl http://localhost:5000/api/recordatorios
```

### Crear
```bash
curl -X POST http://localhost:5000/api/recordatorios \
  -H "Content-Type: application/json" \
  -d '{"texto":"Mi recordatorio","prioridad":"alta"}'
```

### Con Postman: Usa los ejemplos en `pruebas.rest`

---

## 📚 Documentación

- `INSTRUCCIONES.md` - Guía completa
- `DOCUMENTACION_TECNICA.md` - Referencias API
- `README.md` - Detalles adicionales

---

## ⚠️ Problemas?

**Error de módulos**:
```bash
rm -rf node_modules
npm install
```

**Puerto en uso**:
Cambia en `.env`: `PORT=5001`

**Sin conexión MongoDB**:
Verifica internet o prueba con MongoDB local

---

## 🔥 Próximos pasos

1. ✅ Instala: `npm install`
2. ✅ Inicia: `npm run dev`  
3. ✅ Carga datos: `npm run seed` (opcional)
4. ✅ Conecta tu frontend React
5. ✅ ¡Disfruta!

---

**El archivo `.env` ya tiene TODOS los datos que necesitas. No cambies nada.**

¿Listo? 🚀
