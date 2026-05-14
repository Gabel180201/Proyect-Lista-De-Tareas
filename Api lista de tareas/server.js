require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { conectarDB } = require('./config/db');
const recordatoriosRoutes = require('./routes/recordatorios');
const errorHandler = require('./middleware/errorHandler');

// Inicializar Express
const app = express();

// Conectar a Base de Datos
conectarDB();

// ===== MIDDLEWARES =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  })
);

// ===== RUTAS =====
app.use('/api/recordatorios', recordatoriosRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.status(200).json({
    mensaje: '✅ API funcionando correctamente',
    timestamp: new Date(),
    version: process.env.API_VERSION || '1.0',
    bd: 'SQL Server',
  });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.status(200).json({
    mensaje: 'Bienvenido a la API de Recordatorios',
    descripcion: 'API CRUD para gestionar recordatorios y objetivos',
    version: '1.0.0',
    baseDatos: 'SQL Server',
    endpoints: {
      recordatorios: '/api/recordatorios',
      health: '/api/health',
    },
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.path,
    metodo: req.method,
  });
});

// Middleware de manejo de errores
app.use(errorHandler);

// ===== INICIAR SERVIDOR =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║   🚀 API DE RECORDATORIOS INICIADA 🚀    ║
╠════════════════════════════════════════════╣
║  Puerto: ${PORT}                          ║
║  Ambiente: ${process.env.NODE_ENV || 'development'}                  ║
║  Base de datos: SQL Server                 ║
║  CORS origin: ${process.env.CORS_ORIGIN || 'http://localhost:3000'}║
╚════════════════════════════════════════════╝

📍 Endpoints disponibles:
   - GET    /api/recordatorios
   - POST   /api/recordatorios
   - GET    /api/recordatorios/:id
   - PUT    /api/recordatorios/:id
   - DELETE /api/recordatorios/:id
   - GET    /api/recordatorios/filtro/prioridad/:prioridad
   - GET    /api/recordatorios/filtro/completados
   - GET    /api/recordatorios/filtro/pendientes
   - GET    /api/health
  `);
});

// Manejo de errores no capturados
process.on('unhandledRejection', (err) => {
  console.error('❌ Error no manejado:', err);
  process.exit(1);
});

