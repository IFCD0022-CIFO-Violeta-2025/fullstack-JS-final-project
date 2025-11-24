import express from "express";
// import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import userRoutes from  "./users.js";

dotenv.config();
const app = express();

//app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a la base de datos");

    await sequelize.sync({ alter: true });
    console.log("📦 Modelos sincronizados");

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () =>
      console.log(`Servidor corriendo en puerto ${PORT}`)
    );
  } catch (error) {
    console.error("❌ No se pudo conectar:", error);
  }
};

startServer();
