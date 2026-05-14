import React, { useState, useEffect } from 'react';
import './objetivo.css';

function Objetivo() {
  // Estados
  const [recordatorios, setRecordatorios] = useState([]);
  const [nuevoRecordatorio, setNuevoRecordatorio] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [prioridad, setPrioridad] = useState('media');
  const [editandoId, setEditandoId] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  // URL base de la API (cambiar según tu backend)
  const API_URL = 'http://localhost:5000/api/recordatorios';

  // Cargar recordatorios al montar el componente
  useEffect(() => {
    cargarRecordatorios();
  }, []);

  // ===== OPERACIONES CRUD =====

  // READ - Obtener todos los recordatorios
  const cargarRecordatorios = async () => {
    setCargando(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Error al cargar recordatorios');
      const datos = await response.json();
      setRecordatorios(datos);
    } catch (err) {
      console.error('Error:', err);
      setError('No se pudieron cargar los recordatorios');
      // Si no hay backend aún, usar localStorage
      const guardados = localStorage.getItem('recordatorios');
      if (guardados) setRecordatorios(JSON.parse(guardados));
    } finally {
      setCargando(false);
    }
  };

  // CREATE - Agregar nuevo recordatorio
  const agregarRecordatorio = async () => {
    if (!nuevoRecordatorio.trim()) {
      setError('El recordatorio no puede estar vacío');
      return;
    }

    const nuevoRegistro = {
      texto: nuevoRecordatorio,
      fechaVencimiento: fechaVencimiento || null,
      prioridad: prioridad,
      completado: false,
      fechaCreacion: new Date().toISOString(),
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoRegistro),
      });

      if (!response.ok) throw new Error('Error al crear recordatorio');
      const recordatorioCreado = await response.json();
      setRecordatorios([...recordatorios, recordatorioCreado]);
    } catch (err) {
      console.error('Error:', err);
      // Fallback a localStorage si no hay backend
      const conId = { ...nuevoRegistro, id: Date.now() };
      const actualizado = [...recordatorios, conId];
      setRecordatorios(actualizado);
      localStorage.setItem('recordatorios', JSON.stringify(actualizado));
    }

    setNuevoRecordatorio('');
    setFechaVencimiento('');
    setPrioridad('media');
    setError(null);
  };

  // UPDATE - Actualizar recordatorio
  const actualizarRecordatorio = async (id, datosParciales) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosParciales),
      });

      if (!response.ok) throw new Error('Error al actualizar');
      const recordatorioActualizado = await response.json();
      setRecordatorios(
        recordatorios.map((rec) => (rec.id === id ? recordatorioActualizado : rec))
      );
    } catch (err) {
      console.error('Error:', err);
      // Fallback a localStorage
      const actualizado = recordatorios.map((rec) =>
        rec.id === id ? { ...rec, ...datosParciales } : rec
      );
      setRecordatorios(actualizado);
      localStorage.setItem('recordatorios', JSON.stringify(actualizado));
    }
    setEditandoId(null);
  };

  // DELETE - Eliminar recordatorio
  const eliminarRecordatorio = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Error al eliminar');
      setRecordatorios(recordatorios.filter((rec) => rec.id !== id));
    } catch (err) {
      console.error('Error:', err);
      // Fallback a localStorage
      const actualizado = recordatorios.filter((rec) => rec.id !== id);
      setRecordatorios(actualizado);
      localStorage.setItem('recordatorios', JSON.stringify(actualizado));
    }
  };

  // Marcar como completado
  const marcarCompletado = (id, completado) => {
    actualizarRecordatorio(id, { completado: !completado });
  };

  // ===== MANEJADORES DE EVENTOS =====

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') agregarRecordatorio();
  };

  const getPrioridadColor = (prioridad) => {
    switch (prioridad) {
      case 'alta':
        return '#ff4444';
      case 'media':
        return '#ffaa00';
      case 'baja':
        return '#44aa44';
      default:
        return '#666';
    }
  };

  // ===== RENDER =====

  return (
    <div className="contenedor-objetivo">
      <div className="objetivo-box">
        <h2>📝 Recordatorios y Objetivos</h2>

        {/* Mensajes de error */}
        {error && <div className="error-mensaje">{error}</div>}

        {/* Formulario para agregar recordatorio */}
        <div className="formulario-recordatorio">
          <input
            type="text"
            placeholder="Ingresa un recordatorio..."
            value={nuevoRecordatorio}
            onChange={(e) => setNuevoRecordatorio(e.target.value)}
            onKeyPress={handleKeyPress}
            className="input-recordatorio"
          />

          <div>
            <input
              type="date"
              value={fechaVencimiento}
              onChange={(e) => setFechaVencimiento(e.target.value)}
              className="input-fecha"
            />

            <select
              value={prioridad}
              onChange={(e) => setPrioridad(e.target.value)}
              className="select-prioridad"
            >
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>

            <button onClick={agregarRecordatorio} className="btn-agregar">
              + Agregar
            </button>
          </div>
        </div>

        {/* Lista de recordatorios */}
        <div className="lista-recordatorios">
          {cargando ? (
            <p className="cargando">Cargando recordatorios...</p>
          ) : recordatorios.length === 0 ? (
            <p className="sin-recordatorios">No hay recordatorios aún</p>
          ) : (
            <ul>
              {recordatorios.map((rec) => (
                <li key={rec.id} className={rec.completado ? 'completado' : ''}>
                  <div className="contenido-recordatorio">
                    <input
                      type="checkbox"
                      checked={rec.completado}
                      onChange={() => marcarCompletado(rec.id, rec.completado)}
                      className="checkbox-recordatorio"
                    />

                    <div className="texto-recordatorio">
                      <p className="titulo">{rec.texto}</p>
                      <div className="detalles">
                        {rec.fechaVencimiento && (
                          <span className="fecha">
                            📅 {new Date(rec.fechaVencimiento).toLocaleDateString('es-ES')}
                          </span>
                        )}
                        <span
                          className="prioridad"
                          style={{ backgroundColor: getPrioridadColor(rec.prioridad) }}
                        >
                          {rec.prioridad.charAt(0).toUpperCase() + rec.prioridad.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="botones-accion">
                    <button
                      onClick={() => setEditandoId(rec.id)}
                      className="btn-editar"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => eliminarRecordatorio(rec.id)}
                      className="btn-eliminar"
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Información para desarrollo */}
        <div className="info-desarrollo">
          <p>💡 <strong>API URL configurada:</strong> {API_URL}</p>
          <p>📌 Actualmente con fallback a localStorage</p>
        </div>
      </div>
    </div>
  );
}

export default Objetivo;
