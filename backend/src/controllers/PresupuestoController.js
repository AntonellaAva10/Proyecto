const PresupuestoController = {};
const Presupuesto = require("../models/Presupuesto.js");

PresupuestoController.getPresupuestos = async (req, res) => {
  try {
    const presupuestos = await Presupuesto.findAll();
    if (presupuestos) {
      res.status(200).json(presupuestos);
    } else {
      res.status(204);
    }
  } catch (error) {
    console.log("error: " + error);
    res.sendStatus(409);
  }
};

module.exports = PresupuestoController;
