const Maquina = require("../models/Maquina");

class MaquinaService {
  static async deleteMaquina(id) {
    const maquina = await Maquina.findByPk(id);

    if (!maquina) {
      return null;
    }

    await maquina.update({ activo: 1 });

    return maquina;
  }
}

module.exports = MaquinaService;
