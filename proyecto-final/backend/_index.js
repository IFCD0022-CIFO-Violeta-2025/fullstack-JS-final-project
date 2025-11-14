import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import Users from "./models/User.js";
import rutasUsers from "./routes/users.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users", rutasUsers);

const startServer = async () => {
  try {
    await sequelize.sync();
    console.log("✅ Base de datos conectada");

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () =>
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("❌ Error de conexión:", err);
  }
};

startServer();

