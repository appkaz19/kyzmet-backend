import { Router } from 'express';
import * as purchasedController from './purchased.controller.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';
import { adminMiddleware } from '../../middleware/adminMiddleware.js';

const router = Router();

// Получить список купленных контактов текущего пользователя
router.get('/', authMiddleware, purchasedController.getMyPurchasedContacts);

router.get('/tariffs', authMiddleware, purchasedController.getTariffs);
router.post('/tariffs', adminMiddleware, purchasedController.createTariff);
router.patch('/tariffs/:id', adminMiddleware, purchasedController.updateTariff);

export default router;
