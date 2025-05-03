const express = require("express");
const cors = require("cors");
require("dotenv").config();

const initHeartbeatChecker = require("./src/middleware/heartbeatChecker");
const loadRoutes = require("./src/api");

const swaggerUi = require("swagger-ui-express");
const path = require("path");

// Инициализация сервера
const app = express();

// Инициализация OAS Generator ПЕРЕД middleware
const oasGenerator = require("express-oas-generator");
oasGenerator.init(app, {});

// Основные middleware
initHeartbeatChecker();
app.use(cors());
app.use(express.json());

const YAML = require("yamljs");
const swaggerDocument = YAML.load("./src/docs/openapi.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Загрузка всех маршрутов
loadRoutes(app);

// Главная страница
app.get("/", (req, res) => {
  res.send("Kyzmet Backend is Running 🚀");
});

// Статика
app.use(express.static(path.join(__dirname, "src/pages")));

// Запуск
const PORT = process.env.PORT || 6969;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Kyzmet API running at http://localhost:${PORT}`);
  console.log(`📚 Swagger available at http://localhost:${PORT}/api-docs`);
});
