import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import initHeartbeatChecker from "./src/middleware/heartbeatChecker.js";
import loadRoutes from "./src/api/index.js";

import swaggerUi from "swagger-ui-express";
import path from "path";

// Инициализация сервера
const app = express();

// Инициализация OAS Generator ПЕРЕД middleware
import oasGenerator from "express-oas-generator";
oasGenerator.init(app, {});

// Основные middleware
initHeartbeatChecker();
app.use(cors());
app.use(express.json());

import YAML from "yamljs";
const swaggerDocument = YAML.load("./src/docs/openapi.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Загрузка всех маршрутов
loadRoutes(app);

// Главная страница
app.get("/", (req, res) => {
  res.send("Kyzmet Backend is Running 🚀");
});

// Статика
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static(path.join(__dirname, "src/pages")));

// Запуск
const PORT = process.env.PORT || 6969;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Kyzmet API running at http://localhost:${PORT}`);
  console.log(`📚 Swagger available at http://localhost:${PORT}/api-docs`);
});
