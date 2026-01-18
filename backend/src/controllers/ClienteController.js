const ClienteController = {};
const Cliente = require("../models/Cliente.js");
const ClienteService = require("../service/ClienteService.js");

ClienteController.getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll({ where: { activo: 0 } });
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

ClienteController.createCliente = async (req, res) => {
  try {
    const { razon_social, direccion, contacto, cuit, situacion_fiscal } =
      req.body;
    if (!razon_social || !direccion || !cuit) {
      return res.status(400).json({ error: "faltan datos obligatorios" });
    }
    const newClient = await Cliente.create({
      razon_social,
      direccion,
      contacto,
      cuit,
      situacion_fiscal,
    });
    res.status(200).json({
      message: "Cliente creado con exito",
      data: newClient,
    });
  } catch (error) {
    console.error("Error al crear cliente:", error);
    res.status(404).json({ error: "Error al crear cliente" });
  }
};

ClienteController.deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await ClienteService.deleteCliente(id);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado " });
    }
    return res.json({ message: "Cliente eliminado correctamente " });
  } catch (error) {
    console.error("Error al eliminar cliente: ", error);
    return res.status(404).json({ error: "Error al eliminar cliente" });
  }
};

ClienteController.getClientesById = async (req, res) => {
  const { id } = req.params;
  const cliente = await Cliente.findOne({ where: { id_cliente: id } });
  if (!cliente) {
    return res.status(404).json({ error: " Cliente no encontrado " });
  }
  res.json(cliente);
};

ClienteController.updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { razon_social, direccion, contacto, cuit, situacion_fiscal } =
      req.body;
    const cliente = await Cliente.findOne({ where: { id_cliente: id } });

    if (!cliente)
      return res.status(404).json({ error: "Cliente no encontrado " });

    await cliente.update({
      razon_social,
      direccion,
      contacto,
      cuit,
      situacion_fiscal,
    });
    res.json({ message: "Cliente actualizado" });
  } catch (error) {
    console.error("Error al actualizar cliente: ", error);
    return res.status(404).json({ error: "Error al actualizar cliente" });
  }
};

module.exports = ClienteController;
