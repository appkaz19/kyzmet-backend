import { Router } from 'express';
import * as userController from './users.controller.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = Router();

// Защищенные маршруты
router.get('/me', authMiddleware, userController.getMyProfile);
router.patch('/me', authMiddleware, userController.updateMyProfile);
router.get('/:id', authMiddleware, userController.getUserById);

router.post('/push-token', authMiddleware, userController.setPushToken);

export default router;
