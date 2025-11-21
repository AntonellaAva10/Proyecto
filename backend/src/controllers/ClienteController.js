const ClienteController = {};
const Cliente = require("../models/Cliente.js");

ClienteController.getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    if (clientes) {
      res.status(200).json(clientes);
    } else {
      res.status(204);
    }
  } catch (error) {
    console.log("error: " + error);
    res.sendStatus(409);
  }
};

module.exports = ClienteController;
