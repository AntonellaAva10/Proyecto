const Usuario = require("../models/Usuario");

class UsuarioService {
  static async deleteUsuario(id) {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return null;
    }

    await usuario.update({ activo: 1 });

    return usuario;
  }
}

module.exports = UsuarioService;
