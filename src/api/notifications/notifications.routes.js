import { Router } from 'express';
import * as notificationController from './notifications.controller.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = Router();

// Fetch user's notifications
router.get('/', authMiddleware, notificationController.getNotifications);

// Get count of unread notifications
router.get('/unread/count', authMiddleware, notificationController.getUnreadCount);

// Mark a single notification as read
router.patch('/:id/read', authMiddleware, notificationController.markAsRead);

// Mark all notifications as read
router.patch('/read-all', authMiddleware, notificationController.markAllAsRead);

export default router;
