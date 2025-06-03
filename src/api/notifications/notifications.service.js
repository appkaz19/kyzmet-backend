import { PrismaClient } from '@prisma/client';
import admin from '../../core/firebase.js';
import { serialize } from '../../utils/serialize.js';
const messaging = admin.messaging();
const prisma = new PrismaClient();

export async function getUserNotifications(userId) {
  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
  return serialize(notifications);
}

export async function getUnreadCount(userId) {
  return prisma.notification.count({
    where: { userId, isRead: false },
  });
}

export async function markAsRead(userId, notificationId) {
  const result = await prisma.notification.updateMany({
    where: { id: notificationId, userId },
    data: { isRead: true },
  });
  return serialize(result);
}

export async function markAllAsRead(userId) {
  const result = await prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true },
  });
  return serialize(result);
}

export async function sendPushNotification(token, title, body, data = {}) {
  try {
    const message = {
      token,
      notification: {
        title,
        body,
      },
      data, // Optional custom data for in-app navigation, etc.
    };

    const response = await messaging.send(message);
    console.log('✅ Push sent:', response);
    return response;
  } catch (error) {
    console.error('❌ Error sending push:', error);
    throw error;
  }
}