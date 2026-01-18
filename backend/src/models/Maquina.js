const { DataTypes, Model } = require("sequelize");
const { con_sequelize } = require("../database/db");
const Cliente = require("./Cliente");

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
    modelName: "Maquina",
    tableName: "Maquinas",
    timestamps: false,
  }
);

Maquina.belongsTo(Cliente, { foreignKey: "cliente_id", as: "cliente" });
Cliente.hasMany(Maquina, { foreignKey: "cliente_id", as: "maquinas" });

module.exports = Maquina;
