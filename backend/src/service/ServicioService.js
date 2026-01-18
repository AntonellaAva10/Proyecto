const Servicio = require("../models/Servicio");

class ServicioService {
  static async deleteServicio(id) {
    const servicio = await Servicio.findByPk(id);

    if (!servicio) {
      return null;
    }

    await servicio.update({ activo: 1 });

    return servicio;
  }
}

module.exports = ServicioService;
