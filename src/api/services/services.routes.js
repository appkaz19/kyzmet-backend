import { Router } from 'express';
import * as serviceController from './services.controller.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = Router();

// Создать услугу
router.post('/', authMiddleware, serviceController.createService);

// Получить услугу по ID
router.get('/:id', authMiddleware, serviceController.getServiceById);

// Получить все услуги
router.get('/', serviceController.getServices);

// Обновить свою услугу
router.patch('/:id', authMiddleware, serviceController.updateService);

// Поднять в топ
router.post('/:id/promote', authMiddleware, serviceController.promoteService);

// Купить контакт провайдера
router.post('/:id/contact', authMiddleware, serviceController.buyProviderContact);

export default router;
