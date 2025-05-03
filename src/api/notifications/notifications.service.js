const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getUserNotifications = async (userId) => {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

exports.markAsRead = async (notificationId) => {
  return prisma.notification.update({
    where: { id: notificationId },
    data: { isRead: true },
  });
};
