const Presupuesto = require("../models/Presupuesto");

class PresupuestoService {
  static async deletePresupuesto(id) {
    const presupuesto = await Presupuesto.findByPk(id);

    if (!presupuesto) {
      return null;
    }

    await presupuesto.update({ activo: 1 });

    return presupuesto;
  }
}

module.exports = PresupuestoService;
