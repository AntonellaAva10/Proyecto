const TecnicoController = {};
const Tecnico = require("../models/Tecnico.js");

TecnicoController.getTecnicos = async (req, res) => {
  try {
    const tecnicos = await Tecnico.findAll();
    if (tecnicos) {
      res.status(200).json(tecnicos);
    } else {
      res.status(204);
    }
  } catch (error) {
    console.log("error: " + error);
    res.sendStatus(409);
  }
};

module.exports = TecnicoController;
