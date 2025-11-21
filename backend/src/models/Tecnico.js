const { DataTypes, Model } = require("sequelize");
const { con_sequelize } = require("../database/db");

class Tecnico extends Model {}

Tecnico.init(
  {
    id_tecnico: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    mail: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: con_sequelize,
    modelName: "Tecnico",
    tableName: "Tecnicos",
    timestamps: false,
  }
);

module.exports = Tecnico;
