const TecnicoController = {};
const Tecnico = require("../models/Tecnico.js");
const TecnicoService = require("../service/TecnicoService.js");

TecnicoController.getTecnicos = async (req, res) => {
  try {
    const tecnicos = await Tecnico.findAll({
      where: { activo: 0 },
    });
    if (tecnicos) {
      res.status(200).json(tecnicos);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    console.error("Error al obtener técnicos:", error);
    res.sendStatus(409);
  }
};

TecnicoController.createTecnico = async (req, res) => {
  try {
    const { nombre, apellido, direccion, mail, telefono } = req.body;

    if (!nombre || !apellido || !mail) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const newTecnico = await Tecnico.create({
      nombre,
      apellido,
      direccion,
      mail,
      telefono,
    });

    res.status(200).json({
      message: "Técnico creado con éxito",
      data: newTecnico,
    });
  } catch (error) {
    console.error("Error al crear técnico:", error);
    res.status(404).json({ error: "Error al crear técnico" });
  }
};

TecnicoController.deleteTecnico = async (req, res) => {
  try {
    const { id } = req.params;
    const tecnico = await TecnicoService.deleteTecnico(id);

    if (!tecnico) {
      return res.status(404).json({ error: "Técnico no encontrado" });
    }

    return res.json({ message: "Técnico eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar técnico:", error);
    return res.status(404).json({ error: "Error al eliminar técnico" });
  }
};

TecnicoController.getTecnicoById = async (req, res) => {
  const { id } = req.params;
  const tecnico = await Tecnico.findOne({ where: { id_tecnico: id } });

  if (!tecnico) {
    return res.status(404).json({ error: "Técnico no encontrado" });
  }

  res.json(tecnico);
};

TecnicoController.updateTecnico = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, direccion, mail, telefono } = req.body;

    const tecnico = await Tecnico.findOne({ where: { id_tecnico: id } });

    if (!tecnico) {
      return res.status(404).json({ error: "Técnico no encontrado" });
    }

    await tecnico.update({
      nombre,
      apellido,
      direccion,
      mail,
      telefono,
    });

    res.json({ message: "Técnico actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar técnico:", error);
    return res.status(404).json({ error: "Error al actualizar técnico" });
  }
};

module.exports = TecnicoController;
