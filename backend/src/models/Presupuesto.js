const { DataTypes, Model } = require("sequelize");
const { con_sequelize } = require("../database/db");

class Presupuesto extends Model {}

Presupuesto.init(
  {
    id_presupuesto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    detalle: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    costo_total: {
      type: DataTypes.FLOAT,
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
    modelName: "Presupuesto",
    tableName: "Presupuestos",
    timestamps: false,
  }
);

module.exports = Presupuesto;
