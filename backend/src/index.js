const express = require("express");
require("dotenv").config();
const { con_sequelize, ensureDatabase } = require("./database/db");
const router = require("./routes/route");
const cors = require("cors");

const app = express();
app.use(cors());

(async () => {
  try {
    await ensureDatabase();

    await con_sequelize.authenticate();
    console.log("✅ Base de datos lista y conexión establecida");

    await con_sequelize.sync({ alter: true });
    console.log("✅ Tablas sincronizadas");

    app.use(express.json());
    app.use("/api", router);

    app.get("/", (req, res) => {
      res.send("✅ Servidor Node funcionando en puerto 8000");
    });

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () =>
      console.log(`Servidor escuchando en puerto ${PORT}`)
    );
  } catch (error) {
    console.error(
      "❌ Error al inicializar la base de datos o servidor:",
      error
    );
  }
})();
