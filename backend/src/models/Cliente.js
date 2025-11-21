const { DataTypes, Model } = require("sequelize");
const { con_sequelize } = require("../database/db");

class Cliente extends Model {}

Cliente.init(
  {
    id_cliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    razon_social: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    contacto: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    cuit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    situacion_fiscal: {
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
    modelName: "Cliente",
    tableName: "clientes",
    timestamps: false,
  }
);

module.exports = Cliente;
