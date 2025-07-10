const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tarea = sequelize.define('Tarea', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fechaEntrega: {
    type: DataTypes.DATE,
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('Pendiente', 'En Progreso', 'Completada'),
    defaultValue: 'Pendiente'
  }
}, {
  tableName: 'tareas',
  timestamps: true
});

module.exports = Tarea;