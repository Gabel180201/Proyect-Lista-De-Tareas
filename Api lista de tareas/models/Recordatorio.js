const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Recordatorio = sequelize.define(
  'Recordatorio',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    texto: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: {
        len: [3, 500],
      },
    },
    fechaVencimiento: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    prioridad: {
      type: DataTypes.ENUM('baja', 'media', 'alta'),
      defaultValue: 'media',
      allowNull: false,
    },
    completado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: 'Recordatorios',
  }
);

module.exports = Recordatorio;

