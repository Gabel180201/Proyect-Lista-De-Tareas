-- ============================================================
-- 🗄️  SCRIPT COMPLETO DE BASE DE DATOS SQL SERVER
-- Base de datos: lista_tareas_db
-- ============================================================

-- ============================================================
-- 1. CREAR BASE DE DATOS
-- ============================================================
CREATE DATABASE lista_tareas_db;
GO

USE lista_tareas_db;
GO

-- ============================================================
-- 2. CREAR TABLA: Usuarios
-- ============================================================
CREATE TABLE Usuarios (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    activo BIT DEFAULT 1,
    fechaRegistro DATETIME DEFAULT GETDATE(),
    fechaActualizacion DATETIME DEFAULT GETDATE(),
    CONSTRAINT CK_Email CHECK (email LIKE '%@%.%')
);
GO

-- Índice en email para búsquedas rápidas
CREATE INDEX IX_Usuarios_Email ON Usuarios(email);
GO

-- ============================================================
-- 3. CREAR TABLA: Categorias (Opcional - para organizar recordatorios)
-- ============================================================
CREATE TABLE Categorias (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(200),
    color VARCHAR(7) DEFAULT '#FF5733',
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE()
);
GO

-- Insertar categorías de ejemplo
INSERT INTO Categorias (nombre, descripcion, color) VALUES
('Trabajo', 'Tareas relacionadas con el trabajo', '#3498DB'),
('Personal', 'Tareas personales', '#E74C3C'),
('Salud', 'Actividades de salud y ejercicio', '#27AE60'),
('Compras', 'Listas de compras', '#F39C12'),
('Educación', 'Temas de aprendizaje', '#9B59B6');
GO

-- ============================================================
-- 4. CREAR TABLA: Recordatorios (Principal)
-- ============================================================
CREATE TABLE Recordatorios (
    id INT PRIMARY KEY IDENTITY(1,1),
    usuarioId INT,
    categoriaId INT,
    texto VARCHAR(500) NOT NULL,
    descripcion VARCHAR(MAX),
    fechaVencimiento DATETIME,
    prioridad VARCHAR(10) DEFAULT 'media' NOT NULL CHECK (prioridad IN ('baja', 'media', 'alta')),
    completado BIT DEFAULT 0 NOT NULL,
    porcentajeCompletado INT DEFAULT 0 CHECK (porcentajeCompletado BETWEEN 0 AND 100),
    etiquetas VARCHAR(500),
    notas VARCHAR(MAX),
    recordatorio BIT DEFAULT 0,
    fechaRecordatorio DATETIME,
    repetir VARCHAR(20) DEFAULT 'nunca' CHECK (repetir IN ('nunca', 'diario', 'semanal', 'mensual')),
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_Recordatorios_Usuarios FOREIGN KEY (usuarioId) REFERENCES Usuarios(id) ON DELETE SET NULL,
    CONSTRAINT FK_Recordatorios_Categorias FOREIGN KEY (categoriaId) REFERENCES Categorias(id) ON DELETE SET NULL
);
GO

-- Índices para optimizar búsquedas
CREATE INDEX IX_Recordatorios_UsuarioId ON Recordatorios(usuarioId);
CREATE INDEX IX_Recordatorios_CategoriaId ON Recordatorios(categoriaId);
CREATE INDEX IX_Recordatorios_Completado ON Recordatorios(completado);
CREATE INDEX IX_Recordatorios_Prioridad ON Recordatorios(prioridad);
CREATE INDEX IX_Recordatorios_FechaVencimiento ON Recordatorios(fechaVencimiento);
GO

-- ============================================================
-- 5. CREAR TABLA: Auditoría (Para registrar cambios)
-- ============================================================
CREATE TABLE Auditoria (
    id INT PRIMARY KEY IDENTITY(1,1),
    usuarioId INT,
    tabla VARCHAR(50),
    operacion VARCHAR(20) CHECK (operacion IN ('INSERT', 'UPDATE', 'DELETE')),
    recordId INT,
    datosAnteriores VARCHAR(MAX),
    datosNuevos VARCHAR(MAX),
    razonCambio VARCHAR(200),
    fechaCambio DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_Auditoria_Usuarios FOREIGN KEY (usuarioId) REFERENCES Usuarios(id)
);
GO

CREATE INDEX IX_Auditoria_Tabla ON Auditoria(tabla);
CREATE INDEX IX_Auditoria_FechaCambio ON Auditoria(fechaCambio);
GO

-- ============================================================
-- 6. CREAR TABLA: Notificaciones
-- ============================================================
CREATE TABLE Notificaciones (
    id INT PRIMARY KEY IDENTITY(1,1),
    usuarioId INT NOT NULL,
    recordatorioId INT,
    titulo VARCHAR(100) NOT NULL,
    mensaje VARCHAR(500),
    tipo VARCHAR(20) DEFAULT 'info' CHECK (tipo IN ('info', 'advertencia', 'error', 'éxito')),
    leida BIT DEFAULT 0,
    fechaCreacion DATETIME DEFAULT GETDATE(),
    fechaLectura DATETIME,
    CONSTRAINT FK_Notificaciones_Usuarios FOREIGN KEY (usuarioId) REFERENCES Usuarios(id) ON DELETE CASCADE,
    CONSTRAINT FK_Notificaciones_Recordatorios FOREIGN KEY (recordatorioId) REFERENCES Recordatorios(id) ON DELETE CASCADE
);
GO

CREATE INDEX IX_Notificaciones_UsuarioId ON Notificaciones(usuarioId);
CREATE INDEX IX_Notificaciones_Leida ON Notificaciones(leida);
GO

-- ============================================================
-- 7. CREAR TABLA: Archivos (Para adjuntos)
-- ============================================================
CREATE TABLE Archivos (
    id INT PRIMARY KEY IDENTITY(1,1),
    recordatorioId INT,
    nombreArchivo VARCHAR(255) NOT NULL,
    ruta VARCHAR(500) NOT NULL,
    tipoMime VARCHAR(50),
    tamaño INT,
    fechaCarga DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_Archivos_Recordatorios FOREIGN KEY (recordatorioId) REFERENCES Recordatorios(id) ON DELETE CASCADE
);
GO

CREATE INDEX IX_Archivos_RecordatorioId ON Archivos(recordatorioId);
GO

-- ============================================================
-- 8. INSERTAR USUARIO DE EJEMPLO
-- ============================================================
INSERT INTO Usuarios (nombre, email, contrasena, activo) VALUES
('Administrador', 'admin@example.com', 'Admin123!@#', 1),
('Usuario Demo', 'demo@example.com', 'Demo123456', 1);
GO

-- ============================================================
-- 9. INSERTAR RECORDATORIOS DE EJEMPLO
-- ============================================================
INSERT INTO Recordatorios (usuarioId, categoriaId, texto, descripcion, fechaVencimiento, prioridad, completado, etiquetas, repetir)
VALUES
(1, 1, 'Estudiar JavaScript avanzado', 'Revisar conceptos de closures y async/await', '2026-05-15', 'alta', 0, 'programacion,educacion', 'nunca'),
(1, 1, 'Revisar pull requests pendientes', 'Código a revisar en el proyecto principal', '2026-04-30', 'media', 0, 'trabajo,codigo', 'diario'),
(1, 1, 'Actualizar documentación del proyecto', 'Documentación técnica y README', '2026-05-10', 'media', 1, 'documentacion', 'nunca'),
(1, 3, 'Hacer ejercicio 30 minutos', 'Rutina de cardio', '2026-04-29', 'baja', 0, 'salud,ejercicio', 'diario'),
(1, 4, 'Comprar ingredientes para la cena', 'Pollo, arroz, verduras', '2026-04-28', 'media', 0, 'compras,cocina', 'nunca'),
(1, 3, 'Llamar al dentista para cita', 'Revisión dental anual', '2026-05-01', 'alta', 0, 'salud,citas', 'nunca'),
(1, 1, 'Backup de archivos importantes', 'Sincronizar con el servidor remoto', '2026-05-05', 'alta', 0, 'backup,importante', 'semanal'),
(1, 2, 'Leer artículo sobre React Hooks', 'Artículo recomendado en Medium', NULL, 'baja', 0, 'educacion,react', 'nunca');
GO

-- ============================================================
-- 10. CREAR VISTAS ÚTILES
-- ============================================================

-- Vista: Recordatorios Pendientes
CREATE VIEW vw_RecordatoriosPendientes AS
SELECT 
    r.id,
    r.texto,
    r.fechaVencimiento,
    r.prioridad,
    c.nombre AS categoria,
    DATEDIFF(DAY, GETDATE(), r.fechaVencimiento) AS diasFaltantes
FROM Recordatorios r
LEFT JOIN Categorias c ON r.categoriaId = c.id
WHERE r.completado = 0
    AND r.fechaVencimiento IS NOT NULL
ORDER BY r.prioridad DESC, r.fechaVencimiento ASC;
GO

-- Vista: Recordatorios por Prioridad
CREATE VIEW vw_RecordatoriosPorPrioridad AS
SELECT 
    prioridad,
    COUNT(*) AS cantidad,
    COUNT(CASE WHEN completado = 1 THEN 1 END) AS completados,
    COUNT(CASE WHEN completado = 0 THEN 1 END) AS pendientes
FROM Recordatorios
GROUP BY prioridad;
GO

-- Vista: Estadísticas de Recordatorios
CREATE VIEW vw_EstadisticasRecordatorios AS
SELECT 
    COUNT(*) AS totalRecordatorios,
    COUNT(CASE WHEN completado = 1 THEN 1 END) AS completados,
    COUNT(CASE WHEN completado = 0 THEN 1 END) AS pendientes,
    CAST(COUNT(CASE WHEN completado = 1 THEN 1 END) * 100.0 / COUNT(*) AS DECIMAL(5,2)) AS porcentajeCompletado
FROM Recordatorios;
GO

-- ============================================================
-- 11. CREAR PROCEDIMIENTOS ALMACENADOS
-- ============================================================

-- SP: Obtener recordatorios por usuario y rango de fechas
CREATE PROCEDURE sp_ObtenerRecordatoriosPorFecha
    @usuarioId INT,
    @fechaInicio DATETIME,
    @fechaFinal DATETIME
AS
BEGIN
    SELECT 
        r.id,
        r.texto,
        r.descripcion,
        r.fechaVencimiento,
        r.prioridad,
        r.completado,
        c.nombre AS categoria
    FROM Recordatorios r
    LEFT JOIN Categorias c ON r.categoriaId = c.id
    WHERE r.usuarioId = @usuarioId
        AND r.fechaVencimiento BETWEEN @fechaInicio AND @fechaFinal
    ORDER BY r.fechaVencimiento ASC;
END;
GO

-- SP: Marcar recordatorio como completado
CREATE PROCEDURE sp_MarcarCompletado
    @recordatorioId INT,
    @completado BIT
AS
BEGIN
    UPDATE Recordatorios
    SET completado = @completado, updatedAt = GETDATE()
    WHERE id = @recordatorioId;
END;
GO

-- SP: Eliminar recordatorios completados hace más de 30 días
CREATE PROCEDURE sp_LimpiarCompletados
AS
BEGIN
    DELETE FROM Recordatorios
    WHERE completado = 1
        AND updatedAt < DATEADD(DAY, -30, GETDATE());
END;
GO

-- ============================================================
-- 12. CREAR TRIGGER: Auditoría de cambios
-- ============================================================
CREATE TRIGGER tr_AuditarRecordatorios
ON Recordatorios
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    IF EXISTS(SELECT 1 FROM inserted)
    BEGIN
        INSERT INTO Auditoria (usuarioId, tabla, operacion, recordId, datosNuevos, fechaCambio)
        SELECT 1, 'Recordatorios', 'INSERT', id, CONVERT(VARCHAR(MAX), *), GETDATE()
        FROM inserted;
    END;
    
    IF EXISTS(SELECT 1 FROM deleted)
    BEGIN
        INSERT INTO Auditoria (usuarioId, tabla, operacion, recordId, datosAnteriores, fechaCambio)
        SELECT 1, 'Recordatorios', 'DELETE', id, CONVERT(VARCHAR(MAX), *), GETDATE()
        FROM deleted;
    END;
END;
GO

-- ============================================================
-- 13. VERIFICAR QUE TODO ESTÁ CREADO
-- ============================================================

-- Ver tablas
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE';
GO

-- Ver vistas
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.VIEWS WHERE TABLE_SCHEMA = 'dbo';
GO

-- Ver usuarios creados
SELECT * FROM Usuarios;
GO

-- Ver categorías
SELECT * FROM Categorias;
GO

-- Ver recordatorios
SELECT * FROM Recordatorios;
GO

-- ============================================================
-- 🎉 BASE DE DATOS COMPLETAMENTE CONFIGURADA
-- ============================================================
-- Tablas creadas:
--   ✅ Usuarios
--   ✅ Categorias
--   ✅ Recordatorios (Principal)
--   ✅ Auditoria
--   ✅ Notificaciones
--   ✅ Archivos
-- 
-- Vistas creadas:
--   ✅ vw_RecordatoriosPendientes
--   ✅ vw_RecordatoriosPorPrioridad
--   ✅ vw_EstadisticasRecordatorios
--
-- Procedimientos creados:
--   ✅ sp_ObtenerRecordatoriosPorFecha
--   ✅ sp_MarcarCompletado
--   ✅ sp_LimpiarCompletados
--
-- Datos iniciales cargados:
--   ✅ 2 usuarios
--   ✅ 5 categorías
--   ✅ 8 recordatorios de ejemplo
-- ============================================================

