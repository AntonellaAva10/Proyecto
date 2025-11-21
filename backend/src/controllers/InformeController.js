const InformeController = {};
const Informe = require("../models/Informe.js");

InformeController.getInformes = async (req, res) => {
  try {
    const informes = await Informe.findAll();
    if (informes) {
      res.status(200).json(informes);
    } else {
      res.status(204);
    }
  } catch (error) {
    console.log("error: " + error);
    res.sendStatus(409);
  }
};

module.exports = InformeController;
