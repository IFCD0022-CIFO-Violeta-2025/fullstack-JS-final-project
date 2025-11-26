import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import { connectDB } from "./src/dataBase/db.js";
import { sequelize, Profile } from "./src/models/index.js";

const PORT = process.env.PORT || 3000;

const start = async () => {
  await connectDB();

  await sequelize.sync();
  // Гарантуємо наявність базового профілю
  await Profile.findOrCreate({ where: { profileName: "user" } });
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
};

start();
