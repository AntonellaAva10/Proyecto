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

// Clientes
router.get("/clientes", userMiddleware, ClienteController.getClientes);
router.post("/clientes", userMiddleware, ClienteController.createCliente);
router.delete("/clientes/:id", ClienteController.deleteCliente);
router.get("/clientes/:id", userMiddleware, ClienteController.getClientesById);
router.put("/clientes/:id", userMiddleware, ClienteController.updateCliente);
// Maquinas
router.get("/maquinas", userMiddleware, MaquinaController.getMaquinas);
router.post("/maquinas", userMiddleware, MaquinaController.createMaquinas);
router.delete("/maquinas/:id", MaquinaController.deleteMaquina);
router.get("/maquinas/:id", userMiddleware, MaquinaController.getMaquinaById);
router.put("/maquinas/:id", userMiddleware, MaquinaController.updateMaquina);
// Tecnico
router.get("/tecnicos", TecnicoController.getTecnicos);
router.get("/tecnicos/:id", TecnicoController.getTecnicoById);
router.post("/tecnicos", TecnicoController.createTecnico);
router.put("/tecnicos/:id", TecnicoController.updateTecnico);
router.delete("/tecnicos/:id", TecnicoController.deleteTecnico);
// Presupuestos
router.get("/presupuestos", PresupuestoController.getPresupuestos);
router.get("/presupuestos/:id", PresupuestoController.getPresupuestoById);
router.post("/presupuestos", PresupuestoController.createPresupuesto);
router.put("/presupuestos/:id", PresupuestoController.updatePresupuesto);
router.delete("/presupuestos/:id", PresupuestoController.deletePresupuesto);
// Servicios
router.get("/servicios", ServicioController.getServicios);
router.get("/servicios/:id", ServicioController.getServicioById);
router.post("/servicios", ServicioController.createServicio);
router.put("/servicios/:id", ServicioController.updateServicio);
router.delete("/servicios/:id", ServicioController.deleteServicio);
// Informe
router.get("/informes", InformeController.getInformes);
router.get("/informes/:id", InformeController.getInformeById);
router.post("/informes", InformeController.createInforme);
router.put("/informes/:id", InformeController.updateInforme);
router.delete("/informes/:id", InformeController.deleteInforme);
//Usuario
router.post("/usuario/register", UsuarioController.register);
router.post("/usuario/login", UsuarioController.login);

// prueba de endpoint para logear
router.post("/login", authController.login);

// ruta protegida
router.get("/clientes", userMiddleware, (req, res) => {
  res.json({ mensaje: "Ruta protegida /clientes", usuario: req.user });
});

module.exports = router;
