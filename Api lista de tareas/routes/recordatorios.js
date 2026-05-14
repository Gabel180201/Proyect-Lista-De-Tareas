const express = require('express');
const router = express.Router();
const {
  obtenerRecordatorios,
  obtenerRecordatorioPorId,
  crearRecordatorio,
  actualizarRecordatorio,
  eliminarRecordatorio,
  eliminarTodos,
  obtenerPorPrioridad,
  obtenerCompletados,
  obtenerPendientes,
} = require('../controllers/recordatoriosController');

// Rutas básicas CRUD
router.get('/', obtenerRecordatorios);
router.get('/:id', obtenerRecordatorioPorId);
router.post('/', crearRecordatorio);
router.put('/:id', actualizarRecordatorio);
router.delete('/:id', eliminarRecordatorio);

// Rutas adicionales
router.get('/filtro/prioridad/:prioridad', obtenerPorPrioridad);
router.get('/filtro/completados', obtenerCompletados);
router.get('/filtro/pendientes', obtenerPendientes);
router.delete('/', eliminarTodos);

module.exports = router;
