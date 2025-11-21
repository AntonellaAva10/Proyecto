const MaquinaController = {};
const Maquina = require("../models/Maquina.js");

MaquinaController.getMaquinas = async (req, res) => {
  try {
    const maquinas = await Maquina.findAll();
    if (maquinas) {
      res.status(200).json(maquinas);
    } else {
      res.status(204);
    }
  } catch (error) {
    console.log("error: " + error);
    res.sendStatus(409);
  }
};

module.exports = MaquinaController;
