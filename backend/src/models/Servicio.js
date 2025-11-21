const { DataTypes, Model } = require("sequelize");
const { con_sequelize } = require("../database/db");

class Servicio extends Model {}

Servicio.init(
  {
    id_servicio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha_inicio: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    fecha_fin: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    cant_horas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_creacion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    fecha_actualizacion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize: con_sequelize,
    modelName: "Servicio",
    tableName: "Servicios",
    timestamps: false,
  }
);

module.exports = Servicio;
