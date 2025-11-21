const { DataTypes, Model } = require("sequelize");
const { con_sequelize } = require("../database/db");

class Maquina extends Model {}

Maquina.init(
  {
    id_maquina: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    modelo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    nro_serie: {
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
    modelName: "Maquina",
    tableName: "Maquinas",
    timestamps: false,
  }
);

module.exports = Maquina;
