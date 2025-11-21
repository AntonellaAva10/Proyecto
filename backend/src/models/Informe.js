const { DataTypes, Model } = require("sequelize");
const { con_sequelize } = require("../database/db");

class Informe extends Model {}

Informe.init(
  {
    id_informe: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcion_trabajo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    observaciones: {
      type: DataTypes.STRING(100),
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
    modelName: "Informe",
    tableName: "Informes",
    timestamps: false,
  }
);

module.exports = Informe;
