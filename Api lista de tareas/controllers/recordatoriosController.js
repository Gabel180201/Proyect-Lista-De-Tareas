const Recordatorio = require('../models/Recordatorio');
const { Op } = require('sequelize');

// ===== CONTROLLERS =====

// GET - Obtener todos los recordatorios
exports.obtenerRecordatorios = async (req, res) => {
  try {
    const recordatorios = await Recordatorio.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(recordatorios);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener recordatorios',
      error: error.message,
    });
  }
};

// GET - Obtener un recordatorio por ID
exports.obtenerRecordatorioPorId = async (req, res) => {
  try {
    const recordatorio = await Recordatorio.findByPk(req.params.id);
    if (!recordatorio) {
      return res.status(404).json({ mensaje: 'Recordatorio no encontrado' });
    }
    res.status(200).json(recordatorio);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener recordatorio',
      error: error.message,
    });
  }
};

// POST - Crear un nuevo recordatorio
exports.crearRecordatorio = async (req, res) => {
  try {
    const { texto, fechaVencimiento, prioridad, completado } = req.body;

    // Validaciones básicas
    if (!texto || texto.trim().length === 0) {
      return res
        .status(400)
        .json({ mensaje: 'El texto del recordatorio es requerido' });
    }

    const nuevoRecordatorio = await Recordatorio.create({
      texto: texto.trim(),
      fechaVencimiento: fechaVencimiento || null,
      prioridad: prioridad || 'media',
      completado: completado || false,
    });

    res.status(201).json(nuevoRecordatorio);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al crear recordatorio',
      error: error.message,
    });
  }
};

// PUT - Actualizar un recordatorio
exports.actualizarRecordatorio = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizaciones = req.body;

    // Validar que solo se actualicen campos permitidos
    const camposPermitidos = [
      'texto',
      'fechaVencimiento',
      'prioridad',
      'completado',
    ];
    const camposActualizables = {};

    camposPermitidos.forEach((campo) => {
      if (campo in actualizaciones) {
        camposActualizables[campo] = actualizaciones[campo];
      }
    });

    const recordatorio = await Recordatorio.findByPk(id);
    if (!recordatorio) {
      return res.status(404).json({ mensaje: 'Recordatorio no encontrado' });
    }

    const recordatorioActualizado = await recordatorio.update(
      camposActualizables
    );
    res.status(200).json(recordatorioActualizado);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al actualizar recordatorio',
      error: error.message,
    });
  }
};

// DELETE - Eliminar un recordatorio
exports.eliminarRecordatorio = async (req, res) => {
  try {
    const { id } = req.params;

    const recordatorio = await Recordatorio.findByPk(id);
    if (!recordatorio) {
      return res.status(404).json({ mensaje: 'Recordatorio no encontrado' });
    }

    await recordatorio.destroy();
    res.status(200).json({
      mensaje: 'Recordatorio eliminado exitosamente',
      recordatorio: recordatorio,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al eliminar recordatorio',
      error: error.message,
    });
  }
};

// DELETE - Eliminar todos los recordatorios
exports.eliminarTodos = async (req, res) => {
  try {
    const eliminados = await Recordatorio.destroy({ where: {} });
    res.status(200).json({
      mensaje: 'Todos los recordatorios han sido eliminados',
      eliminados: eliminados,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al eliminar recordatorios',
      error: error.message,
    });
  }
};

// GET - Obtener recordatorios por prioridad
exports.obtenerPorPrioridad = async (req, res) => {
  try {
    const { prioridad } = req.params;
    if (!['baja', 'media', 'alta'].includes(prioridad)) {
      return res.status(400).json({
        mensaje: 'Prioridad inválida. Use: baja, media o alta',
      });
    }

    const recordatorios = await Recordatorio.findAll({
      where: { prioridad },
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(recordatorios);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener recordatorios por prioridad',
      error: error.message,
    });
  }
};

// GET - Obtener recordatorios completados
exports.obtenerCompletados = async (req, res) => {
  try {
    const recordatorios = await Recordatorio.findAll({
      where: { completado: true },
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(recordatorios);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener recordatorios completados',
      error: error.message,
    });
  }
};

// GET - Obtener recordatorios pendientes
exports.obtenerPendientes = async (req, res) => {
  try {
    const recordatorios = await Recordatorio.findAll({
      where: { completado: false },
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(recordatorios);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener recordatorios pendientes',
      error: error.message,
    });
  }
};
