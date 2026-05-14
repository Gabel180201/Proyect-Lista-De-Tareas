// Middleware para manejo de errores
const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err.message);

  const status = err.status || 500;
  const mensaje = err.mensaje || 'Error interno del servidor';

  res.status(status).json({
    error: {
      status,
      mensaje,
      detalles: process.env.NODE_ENV === 'development' ? err.message : undefined,
    },
  });
};

module.exports = errorHandler;
