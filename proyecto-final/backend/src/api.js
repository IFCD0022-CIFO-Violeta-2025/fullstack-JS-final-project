
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import "./models/initModels.js"; // Importa TODOS los modelos y relaciones
import userRoutes from "./routes/users.js";

dotenv.config();

const app = express();
// CORS: permitir el origen del frontend (usar FRONT_URL en .env si está definido)
app.use(
  cors({
    origin: process.env.FRONT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());
// Logging simple de peticiones para depuración
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Montar rutas de usuarios (siempre antes de arrancar)
app.use("/api/users", userRoutes);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a la base de datos");

    await sequelize.sync({ alter: true }); // sincroniza sin borrar datos (menos destructivo)
    console.log("✅ Tablas sincronizadas correctamente");
    // Asegurar columna `deleted_at` para modelos con paranoid: true
    try {
      // MySQL 8 soporta IF NOT EXISTS para ADD COLUMN; en otros casos el bloque fallará silenciosamente
      await sequelize.query("ALTER TABLE `Users` ADD COLUMN IF NOT EXISTS `deleted_at` DATETIME NULL;");
      console.log("✅ Columna 'deleted_at' verificada/creada en 'Users'.");
    } catch (colErr) {
      console.warn("⚠️ No se pudo asegurar la columna 'deleted_at' automáticamente:", colErr.message);
    }
  } catch (error) {
    console.error("❌ Error al conectar/sincronizar la base de datos:", error);
    console.log("↪ Se inicia el servidor igualmente para facilitar pruebas (endpoints pueden fallar si dependen de la BD).");
  }

  const PORT = process.env.PORT || 4000; // usar 4000 por defecto para evitar choque con Socket.IO en 3000
  app.listen(PORT, () =>
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
  );
}

startServer();

