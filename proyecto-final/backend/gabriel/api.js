import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import "./models/initModels.js"; // Importa TODOS los modelos y relaciones

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a la base de datos");

    await sequelize.sync({ force: true }); // fuerza creación de todas las tablas
    console.log("✅ Tablas sincronizadas correctamente");

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () =>
      console.log(`Servidor corriendo en http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("❌ Error al iniciar servidor:", error);
  }
}

startServer();
