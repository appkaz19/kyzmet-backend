import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { handleSocketConnection } from './src/socket/chat.gateway.js';
import http from 'http';
dotenv.config();

import initHeartbeatChecker from "./src/middleware/heartbeatChecker.js";
import loadRoutes from "./src/api/index.js";

import swaggerUi from "swagger-ui-express";
import path from "path";

// Инициализация сервера
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: '*' }
});
// Сделаем экземпляр io доступным глобально, чтобы можно было
// отправлять сообщения из HTTP контроллеров
global.io = io;

io.use((sockey, next) => {
  const token = Socket.handshake.auth?.token;
  if (!token) return next(new Error('Auth token required'));

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    Socket.userId = payload.userId;
    next();
  } catch (err) {
    next(new Error('Invalid token'));
  }
});

io.on('connection', (socket) => {
  handleSocketConnection(io, socket);
});

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
