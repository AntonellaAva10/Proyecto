const MaquinaController = {};
const Maquina = require("../models/Maquina.js");
const Cliente = require("../models/Cliente.js");
const MaquinaService = require("../service/MaquinaService.js");

MaquinaController.getMaquinas = async (req, res) => {
  try {
    const maquinas = await Maquina.findAll({
      where: { activo: 0 },
      include: [
        {
          model: Cliente,
          as: "cliente",
          attributes: ["id_cliente", "razon_social"],
        },
      ],
    });
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

MaquinaController.createMaquinas = async (req, res) => {
  try {
    const { modelo, nro_serie, cliente_id } = req.body;

    if (!modelo || !nro_serie || !cliente_id) {
      return res.status(400).json({ error: "faltan datos obligatorios" });
    }

    const newMaquina = await Maquina.create({
      modelo,
      nro_serie,
      cliente_id,
    });

    res.status(200).json({
      message: "Maquina registrada con exito",
      data: newMaquina,
    });
  } catch (error) {
    console.error("Error al crear la maquina: ", error);
    res.status(500).json({ error: "Error al crear la maquina" });
  }
};

MaquinaController.deleteMaquina = async (req, res) => {
  try {
    const { id } = req.params;
    const maquina = await MaquinaService.deleteMaquina(id);
    if (!maquina)
      return res.status(404).json({ error: "Maquina no encontrado" });
    return res.json({ message: "Maquina eliminada correctamente" });
  } catch (error) {
    console.error("Error al borrar la maquina: ", error);
    res.status(404).json({ error: "Error al borrar la maquina" });
  }
};

MaquinaController.getMaquinaById = async (req, res) => {
  const { id } = req.params;
  const maquina = await Maquina.findOne({ where: { id_maquina: id } });
  if (!maquina) return res.status(404).json({ error: "Maquina no encontrada" });
  res.json(maquina);
};

MaquinaController.updateMaquina = async (req, res) => {
  try {
    const { id } = req.params;
    const { modelo, nro_serie, cliente_id } = req.body;
    const maquina = await Maquina.findOne({ where: { id_maquina: id } });
    if (!maquina)
      return res.status(404).json({ error: "Maquina no encontrada" });
    await maquina.update({
      modelo,
      nro_serie,
      cliente_id,
    });
    res.json({ message: "Maquina actualizada" });
  } catch (error) {
    console.error("Error al actualizar la maquina: ", error);
    return res.status(404).json({ error: "Error al actualizar la maquina" });
  }
};

module.exports = MaquinaController;
