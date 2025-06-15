import { Router } from 'express';
import * as purchasedController from './purchased.controller.js';
import * as tariffsController from './tariffs.controller.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';
import { adminMiddleware } from '../../middleware/adminMiddleware.js';

const router = Router();

// Получить список купленных контактов текущего пользователя
router.get('/', authMiddleware, purchasedController.getMyPurchasedContacts);

router.get('/tariffs', authMiddleware, tariffsController.listTariffs);
router.post('/tariffs', adminMiddleware, tariffsController.createTariff);
router.patch('/tariffs/:id', adminMiddleware, tariffsController.updateTariff);
router.delete('/tariffs/:id', adminMiddleware, tariffsController.deleteTariff);

export default router;
