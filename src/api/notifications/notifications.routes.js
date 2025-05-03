import express from 'express';
import * as controller from './notifications.controller.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, controller.getNotifications);
router.patch('/:id/read', authMiddleware, controller.markAsRead);

export default router;
