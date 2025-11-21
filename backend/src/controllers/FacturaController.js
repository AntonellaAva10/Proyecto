const FacturaController = {};
const Factura = require("../models/Factura.js");

FacturaController.getFacturas = async (req, res) => {
  try {
    const facturas = await Factura.findAll();
    if (facturas) {
      res.status(200).json(facturas);
    } else {
      res.status(204);
    }
  } catch (error) {
    console.log("error: " + error);
    res.sendStatus(409);
  }
};

module.exports = FacturaController;
