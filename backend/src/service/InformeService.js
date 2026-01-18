const Informe = require("../models/Informe");

class InformeService {
  static async deleteInforme(id) {
    const informe = await Informe.findByPk(id);

    if (!informe) {
      return null;
    }

    await informe.update({ activo: 1 });

    return informe;
  }
}

module.exports = InformeService;
