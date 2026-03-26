import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes/index.js";
import userHistoryRoutes from "./routes/userHistoryRoutes.js";
import eventHistoryRoutes from "./routes/eventHistoryRoutes.js";
import { swaggerSpec, swaggerUiMiddleware } from "./config/swagger.js";
import statsRoutes from "./routes/statsRoutes.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev"));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api", routes);

// Swagger UI
app.use(
  "/api-docs",
  swaggerUiMiddleware.serve,
  swaggerUiMiddleware.setup(swaggerSpec)
);

app.use("/api/user-history", userHistoryRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/event-history", eventHistoryRoutes);

// 404
app.use((_req, res) => res.status(404).json({ error: "Not found" }));

export default app;
