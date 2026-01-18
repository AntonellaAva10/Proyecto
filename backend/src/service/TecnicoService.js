const Tecnico = require("../models/Tecnico");

class TecnicoService {
  static async deleteTecnico(id) {
    const tecnico = await Tecnico.findByPk(id);

    if (!tecnico) {
      return null;
    }

    await tecnico.update({ activo: 1 });

    return tecnico;
  }
}

module.exports = TecnicoService;
