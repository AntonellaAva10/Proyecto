const { DataTypes, Model } = require("sequelize");
const { con_sequelize } = require("../database/db");

class Factura extends Model {}

Factura.init(
  {
    id_factura: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    estado: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize: con_sequelize,
    modelName: "Factura",
    tableName: "facturas",
    timestamps: false,
  }
);

module.exports = Factura;
