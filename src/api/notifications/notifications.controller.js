import * as notificationService from './notifications.service.js';

export async function getNotifications(req, res) {
  try {
    const notifications = await notificationService.getUserNotifications(req.user.userId);
    res.json(notifications);
  } catch (error) {
    console.error('🔥 Get notifications error:', error);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
}

export async function getUnreadCount(req, res) {
  try {
    const count = await notificationService.getUnreadCount(req.user.userId);
    res.json({ unreadCount: count });
  } catch (error) {
    console.error('🔥 Get unread count error:', error);
    res.status(500).json({ error: 'Failed to fetch unread count' });
  }
}

export async function markAsRead(req, res) {
  try {
    await notificationService.markAsRead(req.user.userId, req.params.id);
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error('🔥 Mark as read error:', error);
    res.status(500).json({ error: 'Failed to mark as read' });
  }
}

export async function markAllAsRead(req, res) {
  try {
    await notificationService.markAllAsRead(req.user.userId);
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('🔥 Mark all as read error:', error);
    res.status(500).json({ error: 'Failed to mark all as read' });
  }
}
