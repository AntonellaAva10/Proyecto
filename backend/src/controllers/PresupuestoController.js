const PresupuestoController = {};
const Presupuesto = require("../models/Presupuesto.js");
const PresupuestoService = require("../service/PresupuestoService.js");
const Cliente = require("../models/Cliente.js");

PresupuestoController.getPresupuestos = async (req, res) => {
  try {
    const presupuestos = await Presupuesto.findAll({
      where: { activo: 0 },
      include: [
        {
          model: Cliente,
          as: "cliente",
          attributes: ["id_cliente", "razon_social"],
        },
      ],
    });
    if (presupuestos) {
      res.status(200).json(presupuestos);
    } else {
      res.status(204).json([]);
    }
  } catch (error) {
    console.error("Error al obtener presupuestos:", error);
    res.sendStatus(409);
  }
};

PresupuestoController.createPresupuesto = async (req, res) => {
  try {
    const { cliente_id, fecha, detalle, costo_total } = req.body;

    if (!cliente_id || !fecha || !detalle || !costo_total) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const newPresupuesto = await Presupuesto.create({
      cliente_id,
      fecha,
      detalle,
      costo_total,
    });

    res.status(200).json({
      message: "Presupuesto creado con éxito",
      data: newPresupuesto,
    });
  } catch (error) {
    console.error("Error al crear presupuesto:", error);
    res.status(404).json({ error: "Error al crear presupuesto" });
  }
};

PresupuestoController.getPresupuestoById = async (req, res) => {
  try {
    const { id } = req.params;
    const presupuesto = await Presupuesto.findOne({
      where: { id_presupuesto: id },
      include: ["cliente"],
    });

    if (!presupuesto)
      return res.status(404).json({ error: "Presupuesto no encontrado" });
    res.json(presupuesto);
  } catch (error) {
    console.error("Error al obtener presupuesto:", error);
    res.status(404).json({ error: "Error al obtener presupuesto" });
  }
};

PresupuestoController.updatePresupuesto = async (req, res) => {
  try {
    const { id } = req.params;
    const { cliente_id, fecha, estado, detalle, costo_total } = req.body;

    const presupuesto = await Presupuesto.findOne({
      where: { id_presupuesto: id },
    });
    if (!presupuesto)
      return res.status(404).json({ error: "Presupuesto no encontrado" });

    await presupuesto.update({
      cliente_id,
      fecha,
      estado,
      detalle,
      costo_total,
      fecha_actualizacion: new Date(),
    });

    res.json({ message: "Presupuesto actualizado" });
  } catch (error) {
    console.error("Error al actualizar presupuesto:", error);
    res.status(404).json({ error: "Error al actualizar presupuesto" });
  }
};

PresupuestoController.deletePresupuesto = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = (await PresupuestoService.deletePresupuesto)
      ? await PresupuestoService.deletePresupuesto(id)
      : await Presupuesto.destroy({ where: { id_presupuesto: id } });

    if (!deleted)
      return res.status(404).json({ error: "Presupuesto no encontrado" });

    res.json({ message: "Presupuesto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar presupuesto:", error);
    res.status(404).json({ error: "Error al eliminar presupuesto" });
  }
};

module.exports = PresupuestoController;
