const Cliente = require("../models/Cliente");
const Maquina = require("../models/Maquina");
const Presupuesto = require("../models/Presupuesto");

class ClienteService {
  static async deleteCliente(id) {
    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
      return null;
    }

    await cliente.update({ activo: 1 });
    await Maquina.update({ activo: 1 }, { where: { cliente_id: id } });
    await Presupuesto.update(
      { activo: 1 },
      { where: { cliente_id: id, estado: "pendiente" } }
    );

    return cliente;
  }
}

module.exports = ClienteService;
