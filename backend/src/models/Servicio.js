const { DataTypes, Model } = require("sequelize");
const { con_sequelize } = require("../database/db");
const Presupuesto = require("./Presupuesto");
const Maquina = require("./Maquina");
const Tecnico = require("./Tecnico");

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
    presupuesto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Presupuesto,
        key: "id_presupuesto",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    maquina_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Maquina,
        key: "id_maquina",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    tecnico_asignado: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Tecnico,
        key: "id_tecnico",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
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
    modelName: "Servicio",
    tableName: "Servicios",
    timestamps: false,
  }
);

Servicio.belongsTo(Presupuesto, {
  foreignKey: "presupuesto_id",
  as: "presupuesto",
});
Servicio.belongsTo(Maquina, { foreignKey: "maquina_id", as: "maquina" });
Servicio.belongsTo(Tecnico, { foreignKey: "tecnico_asignado", as: "tecnico" });

module.exports = Servicio;
