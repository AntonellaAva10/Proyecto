const ServicioController = {};
const Servicio = require("../models/Servicio.js");
const ServicioService = require("../service/ServicioService.js");
const Presupuesto = require("../models/Presupuesto.js");
const Maquina = require("../models/Maquina.js");
const Tecnico = require("../models/Tecnico.js");

ServicioController.getServicios = async (req, res) => {
  try {
    const servicios = await Servicio.findAll({
      where: { activo: 0 },
      include: [
        { model: Maquina, as: "maquina", attributes: ["id_maquina", "modelo"] },
        {
          model: Tecnico,
          as: "tecnico",
          attributes: ["id_tecnico", "nombre", "apellido"],
        },
        {
          model: Presupuesto,
          as: "presupuesto",
          attributes: ["id_presupuesto", "detalle"],
        },
      ],
    });

    if (servicios) {
      res.status(200).json(servicios);
    } else {
      res.status(204).json([]);
    }
  } catch (error) {
    console.error("Error al obtener servicios:", error);
    res.sendStatus(409);
  }
};

ServicioController.createServicio = async (req, res) => {
  try {
    const {
      fecha_inicio,
      fecha_fin,
      cant_horas,
      presupuesto_id,
      maquina_id,
      tecnico_asignado,
    } = req.body;

    if (
      !fecha_inicio ||
      !fecha_fin ||
      !cant_horas ||
      !presupuesto_id ||
      !maquina_id ||
      !tecnico_asignado
    ) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const newServicio = await Servicio.create({
      fecha_inicio,
      fecha_fin,
      cant_horas,
      presupuesto_id,
      maquina_id,
      tecnico_asignado,
    });

    res.status(200).json({
      message: "Servicio creado con éxito",
      data: newServicio,
    });
  } catch (error) {
    console.error("Error al crear servicio:", error);
    res.status(404).json({ error: "Error al crear servicio" });
  }
};

ServicioController.getServicioById = async (req, res) => {
  try {
    const { id } = req.params;
    const servicio = await Servicio.findOne({
      where: { id_servicio: id, activo: 0 },
      include: [
        { model: Maquina, as: "maquina", attributes: ["id_maquina", "modelo"] },
        {
          model: Tecnico,
          as: "tecnico",
          attributes: ["id_tecnico", "nombre", "apellido"],
        },
        {
          model: Presupuesto,
          as: "presupuesto",
          attributes: ["id_presupuesto", "detalle"],
        },
      ],
    });

    if (!servicio)
      return res.status(404).json({ error: "Servicio no encontrado" });
    res.json(servicio);
  } catch (error) {
    console.error("Error al obtener servicio:", error);
    res.status(404).json({ error: "Error al obtener servicio" });
  }
};

ServicioController.updateServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      fecha_inicio,
      fecha_fin,
      cant_horas,
      presupuesto_id,
      maquina_id,
      tecnico_asignado,
    } = req.body;

    const servicio = await Servicio.findOne({ where: { id_servicio: id } });
    if (!servicio)
      return res.status(404).json({ error: "Servicio no encontrado" });

    await servicio.update({
      fecha_inicio,
      fecha_fin,
      cant_horas,
      presupuesto_id,
      maquina_id,
      tecnico_asignado,
      fecha_actualizacion: new Date(),
    });

    res.json({ message: "Servicio actualizado" });
  } catch (error) {
    console.error("Error al actualizar servicio:", error);
    res.status(404).json({ error: "Error al actualizar servicio" });
  }
};

ServicioController.deleteServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = (await ServicioService.deleteServicio)
      ? await ServicioService.deleteServicio(id) // si usas service
      : await Servicio.destroy({ where: { id_servicio: id } });

    if (!deleted)
      return res.status(404).json({ error: "Servicio no encontrado" });

    res.json({ message: "Servicio eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar servicio:", error);
    res.status(404).json({ error: "Error al eliminar servicio" });
  }
};

module.exports = ServicioController;
