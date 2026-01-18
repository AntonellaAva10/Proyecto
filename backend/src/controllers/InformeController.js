const InformeController = {};
const Informe = require("../models/Informe.js");
const Servicio = require("../models/Servicio.js");
const Tecnico = require("../models/Tecnico.js");

InformeController.getInformes = async (req, res) => {
  try {
    const informes = await Informe.findAll({
      where: { activo: 0 },
      include: [
        {
          model: Servicio,
          as: "servicio",
          attributes: ["id_servicio", "fecha_inicio"],
        },
        {
          model: Tecnico,
          as: "tecnico",
          attributes: ["id_tecnico", "nombre", "apellido"],
        },
      ],
    });

    // Siempre devolver 200 y un array
    res.status(200).json(informes);
  } catch (error) {
    console.error("Error al obtener informes:", error);
    res.status(500).json({ error: "Error al obtener informes" });
  }
};

InformeController.getInformeById = async (req, res) => {
  try {
    const { id } = req.params;
    const informe = await Informe.findOne({
      where: { id_informe: id, activo: 0 },
      include: [
        {
          model: Servicio,
          as: "servicio",
          attributes: ["id_servicio", "fecha_inicio"],
        },
        {
          model: Tecnico,
          as: "tecnico",
          attributes: ["id_tecnico", "nombre", "apellido"],
        },
      ],
    });

    if (!informe) {
      return res.status(404).json({ error: "Informe no encontrado" });
    }

    res.status(200).json(informe);
  } catch (error) {
    console.error("Error al obtener informe:", error);
    res.status(500).json({ error: "Error al obtener informe" });
  }
};

InformeController.createInforme = async (req, res) => {
  try {
    const { descripcion_trabajo, observaciones, servicio_id, tecnico_id } =
      req.body;

    if (!descripcion_trabajo || !observaciones || !servicio_id || !tecnico_id) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const newInforme = await Informe.create({
      descripcion_trabajo,
      observaciones,
      servicio_id,
      tecnico_id,
    });

    res.status(201).json({
      message: "Informe creado con éxito",
      data: newInforme,
    });
  } catch (error) {
    console.error("Error al crear informe:", error);
    res.status(500).json({ error: "Error al crear informe" });
  }
};

InformeController.updateInforme = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion_trabajo, observaciones, servicio_id, tecnico_id } =
      req.body;

    const informe = await Informe.findOne({ where: { id_informe: id } });
    if (!informe)
      return res.status(404).json({ error: "Informe no encontrado" });

    await informe.update({
      descripcion_trabajo,
      observaciones,
      servicio_id,
      tecnico_id,
      fecha_actualizacion: new Date(),
    });

    res
      .status(200)
      .json({ message: "Informe actualizado correctamente", data: informe });
  } catch (error) {
    console.error("Error al actualizar informe:", error);
    res.status(500).json({ error: "Error al actualizar informe" });
  }
};

InformeController.deleteInforme = async (req, res) => {
  try {
    const { id } = req.params;
    const informe = await Informe.findOne({ where: { id_informe: id } });

    if (!informe)
      return res.status(404).json({ error: "Informe no encontrado" });

    await informe.destroy();
    res.status(200).json({ message: "Informe eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar informe:", error);
    res.status(500).json({ error: "Error al eliminar informe" });
  }
};

module.exports = InformeController;
