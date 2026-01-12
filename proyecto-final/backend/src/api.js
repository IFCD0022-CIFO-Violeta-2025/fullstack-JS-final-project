import express from 'express'
import config from "./config/config.js";
import notFound from "./middlewares/error.middleware.js"
import routes from "./routes/index.js";
import cors from 'cors';
import { sequelize } from './models/index.js';

const api = express();

// CORS: permitir el origen del frontend (usar FRONT_URL en .env si está definido)
api.use(
  cors({
    //origin: process.env.FRONT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// middleware config  
api.use(express.json());

api.use("/api/v1", routes);

api.use(notFound);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a la base de datos");

    await sequelize.sync({ alter: true }); // sincroniza sin borrar datos (menos destructivo)
    console.log("✅ Tablas sincronizadas correctamente");
    // Asegurar columna `deleted_at` para modelos con paranoid: true
  } catch (error) {
    console.error("❌ Error al conectar/sincronizar la base de datos:", error);
    console.log("↪ Se inicia el servidor igualmente para facilitar pruebas (endpoints pueden fallar si dependen de la BD).");
  }
}
startServer();

api.listen(config.api_port, () => {
    console.log(`===========================================`)
    console.log(`Servidor corriendo en puerto ${config.api_port}`)
    console.log(`URL http://localhost:${config.api_port}`)
    console.log(`===========================================`)
});
