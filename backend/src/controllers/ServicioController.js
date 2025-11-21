const ServicioController = {};
const Servicio = require("../models/Servicio.js");

ServicioController.getServicios = async (req, res) => {
  try {
    const servicios = await Servicio.findAll();
    if (servicios) {
      res.status(200).json(servicios);
    } else {
      res.status(204);
    }
  } catch (error) {
    console.log("error: " + error);
    res.sendStatus(409);
  }
};

module.exports = ServicioController;
