const { DataTypes, Model } = require("sequelize");
const { con_sequelize } = require("../database/db");
const Cliente = require("./Cliente.js");

class Presupuesto extends Model {}

Presupuesto.init(
  {
    id_presupuesto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Cliente,
        key: "id_cliente",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "pendiente",
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
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    fecha_actualizacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    activo: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize: con_sequelize,
    modelName: "Presupuesto",
    tableName: "Presupuestos",
    timestamps: false,
  }
);

Presupuesto.belongsTo(Cliente, { foreignKey: "cliente_id", as: "cliente" });
Cliente.hasMany(Presupuesto, { foreignKey: "cliente_id", as: "presupuestos" });

module.exports = Presupuesto;
