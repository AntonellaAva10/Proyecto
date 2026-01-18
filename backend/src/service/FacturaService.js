const Factura = require("../models/Factura");

class FacturaService {
  static async deleteFactura(id) {
    const factura = await Factura.findByPk(id);

    if (!factura) {
      return null;
    }

    await factura.update({ activo: 1 });

    return factura;
  }
}

module.exports = FacturaService;
