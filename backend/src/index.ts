import express, { Application, Request as ExpressRequest, Response as ExpressResponse } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
import { APP_CONFIG } from "./env";

const app: Application = express();
const PORT = APP_CONFIG.PORT;

/**
 * Database Connection
 */

/**
 * Middlwares
 */
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

/**
 * Routes
 */
app.get("/test", (_req: ExpressRequest, _res: ExpressResponse) => {
  _res.status(200).json({
    status: "ok",
    message: `Server is running on http://localhost:${PORT}`,
  });
});

app.use((_req: ExpressRequest, res: ExpressResponse) => {
  res.status(404).json({ message: "Route not found" });
});

/**
 * Server Runner
 */
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});