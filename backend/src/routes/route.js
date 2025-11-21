const express = require("express");
const router = express.Router();
const userMiddleware = require("../middlewares/usarMiddleware.js");
const authController = require("../controllers/authController.js");
const ClienteController = require("../controllers/ClienteController.js");
const FacturaController = require("../controllers/FacturaController.js");
const InformeController = require("../controllers/InformeController.js");
const MaquinaController = require("../controllers/MaquinaController.js");
const PresupuestoController = require("../controllers/PresupuestoController.js");
const ServicioController = require("../controllers/ServicioController.js");
const TecnicoController = require("../controllers/TecnicoController.js");
const UsuarioController = require("../controllers/UsuarioController.js");

router.get("/clientes", userMiddleware, ClienteController.getClientes);
router.get("/facturas", FacturaController.getFacturas);
router.get("/informes", InformeController.getInformes);
router.get("/maquinas", MaquinaController.getMaquinas);
router.get("/presupuestos", PresupuestoController.getPresupuestos);
router.get("/servicios", ServicioController.getServicios);
router.get("/tecnicos", TecnicoController.getTecnicos);
router.post("/usuario/register", UsuarioController.register);
router.post("/usuario/login", UsuarioController.login);

// prueba de endpoint para logear
router.post("/login", authController.login);

// ruta protegida
router.get("/clientes", userMiddleware, (req, res) => {
  res.json({ mensaje: "Ruta protegida /clientes", usuario: req.user });
});

module.exports = router;
