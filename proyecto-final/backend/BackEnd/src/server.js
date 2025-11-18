import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./dataBase/db.js";
import { sequelize, Profile } from "./models/index.js";

const PORT = process.env.PORT || 3000;

const start = async () => {
  await connectDB();
  // In development: Schema synchronization
  await sequelize.sync({ alter: true });
  // Guarantee the availability of a basic profile
  await Profile.findOrCreate({ where: { profileName: "user" } });
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
};

start();
