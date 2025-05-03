import { Router } from 'express';
import * as chatController from './chat.controller.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = Router();

// Начать чат с другим пользователем
router.post('/start', authMiddleware, chatController.startChat);

// Получить список чатов
router.get('/', authMiddleware, chatController.getMyChats);

// Получить сообщения в чате
router.get('/:chatId/messages', authMiddleware, chatController.getChatMessages);

// Отправить сообщение
router.post('/:chatId/messages', authMiddleware, chatController.sendMessage);

export default router;
