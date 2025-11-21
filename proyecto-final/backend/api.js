import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import userRoutes from "./routes/users.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);


function testFunction() {
  console.log("nothing");
}

async function startServer() {
  try {
    // Conectar y sincronizar DB
    await sequelize.authenticate();
    console.log("✅ Conectado a la base de datos");

    await sequelize.sync({ alter: true });
    console.log("📦 Tablas sincronizadas");

    // Llamar función de prueba
    testFunction();

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () =>
      console.log(`Servidor corriendo en http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("❌ No se pudo conectar:", error);
  }
}

startServer();
