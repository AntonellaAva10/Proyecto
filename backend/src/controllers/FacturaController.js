const FacturaController = {};
const Factura = require("../models/Factura.js");
const Servicio = require("../models/Servicio.js");

FacturaController.getFacturas = async (req, res) => {
  try {
    const facturas = await Factura.findAll({
      where: { activo: 0 },
      include: [
        { model: Servicio, as: "servicio" },
        { model: VentaRepuesto, as: "ventarepuesto" },
      ],
    });

    if (facturas.length > 0) {
      res.status(200).json(facturas);
    } else {
      res.status(204).json({ message: "No hay facturas disponibles" });
    }
  } catch (error) {
    console.error("Error al obtener facturas:", error);
    res.sendStatus(409);
  }
};

// Crear una nueva factura
FacturaController.createFactura = async (req, res) => {
  try {
    const { estado, servicio_id, ventarepuesto_id } = req.body;

    if (!estado || !servicio_id) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const newFactura = await Factura.create({
      estado,
      servicio_id,
      ventarepuesto_id,
    });

    res.status(200).json({
      message: "Factura creada con éxito",
      data: newFactura,
    });
  } catch (error) {
    console.error("Error al crear factura:", error);
    res.status(404).json({ error: "Error al crear factura" });
  }
};

// Obtener factura por ID
FacturaController.getFacturaById = async (req, res) => {
  try {
    const { id } = req.params;
    const factura = await Factura.findOne({
      where: { id_factura: id },
      include: [
        { model: Servicio, as: "servicio" },
        { model: VentaRepuesto, as: "ventarepuesto" },
      ],
    });

    if (!factura) {
      return res.status(404).json({ error: "Factura no encontrada" });
    }

    res.json(factura);
  } catch (error) {
    console.error("Error al obtener factura:", error);
    res.status(404).json({ error: "Error al obtener factura" });
  }
};

// Actualizar factura
FacturaController.updateFactura = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, servicio_id, ventarepuesto_id } = req.body;

    const factura = await Factura.findOne({ where: { id_factura: id } });

    if (!factura) {
      return res.status(404).json({ error: "Factura no encontrada" });
    }

    await factura.update({
      estado,
      servicio_id,
      ventarepuesto_id,
    });

    res.json({ message: "Factura actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar factura:", error);
    res.status(404).json({ error: "Error al actualizar factura" });
  }
};

// Eliminar factura
FacturaController.deleteFactura = async (req, res) => {
  try {
    const { id } = req.params;
    const factura = await Factura.findOne({ where: { id_factura: id } });

    if (!factura) {
      return res.status(404).json({ error: "Factura no encontrada" });
    }

    await factura.destroy();
    res.json({ message: "Factura eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar factura:", error);
    res.status(404).json({ error: "Error al eliminar factura" });
  }
};

module.exports = FacturaController;
