const { DataTypes, Model } = require("sequelize");
const { con_sequelize } = require("../database/db");
const Servicio = require("./Servicio.js");
const Tecnico = require("./Tecnico.js");

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
    servicio_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Servicio,
        key: "id_servicio",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    tecnico_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Tecnico,
        key: "id_tecnico",
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
    modelName: "Informe",
    tableName: "Informes",
    timestamps: false,
  }
);

Informe.belongsTo(Servicio, { foreignKey: "servicio_id", as: "servicio" });
Servicio.hasMany(Informe, { foreignKey: "servicio_id", as: "informes" });

Informe.belongsTo(Tecnico, { foreignKey: "tecnico_id", as: "tecnico" });
Tecnico.hasMany(Informe, { foreignKey: "tecnico_id", as: "informes" });

module.exports = Informe;
