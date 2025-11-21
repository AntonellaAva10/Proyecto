const UsuarioController = {};
const Usuario = require("../models/Usuario.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

UsuarioController.register = async (req, res) => {
  try {
    const user = new Usuario(req.body);
    await user.save();
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(204);
    }
  } catch (error) {
    console.log("error: " + error);
    res.sendStatus(409);
  }
};

UsuarioController.login = async (req, res) => {
  try {
    const { usuario, password } = req.body;
    const user = await Usuario.findOne({ usuario: usuario });
    if (!user) {
      return res.status(401).json({ mensaje: "Usuario no encontrado" });
    }
    if (password !== user.password) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    const payload = { usuario: user.usuario, rol: user.rol };
    const token = jwt.sign(payload, process.env.APP_JWT_SECRET_USER, {
      expiresIn: "8h",
    });
    res.status(200).json({ ...payload, token });
  } catch (error) {
    console.log(error);
    res.status(409).json({ mensaje: "Error interno del servidor" });
  }
};

module.exports = UsuarioController;
