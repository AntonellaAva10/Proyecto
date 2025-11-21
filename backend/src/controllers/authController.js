require("dotenv").config();
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const user = {
    id_usuario: 1,
    nombre: "Antonella",
  };

  const token = jwt.sign(user, process.env.APP_JWT_SECRET_USER, {
    expiresIn: "1h",
  });

  res.json({
    mensaje: "Login exitoso",
    token,
  });
};

module.exports = { login };
