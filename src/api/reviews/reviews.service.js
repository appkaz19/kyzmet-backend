import admin from '../../core/firebase.js';
import { PrismaClient } from '@prisma/client';
import { serialize } from '../../utils/serialize.js';
const prisma = new PrismaClient();

export async function submitReview(userId, data) {
  const { serviceId, rating, comment } = data;

  if (!serviceId || !rating) {
    throw new Error('serviceId and rating are required');
  }

  const existing = await prisma.review.findFirst({
    where: { userId, serviceId },
  });
  if (existing) {
    throw new Error('Review already submitted for this service');
  }

  const review = await prisma.review.create({
    data: {
      serviceId,
      userId,
      rating,
      comment,
    },
  });

  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    select: { userId: true },
  });

  if (service) {
    const recipient = await prisma.user.findUnique({
      where: { id: service.userId },
    });

    if (recipient?.pushToken) {
      await admin.messaging().send({
        token: recipient.pushToken,
        notification: {
          title: '⭐ Новый отзыв',
          body: `Вы получили новый отзыв: ${comment?.slice(0, 100) ?? ''}`,
        },
        data: {
          type: 'review',
          serviceId: serviceId.toString(),
        },
      });
    }
  }

  return serialize({ message: 'Review submitted', review });
}

export async function getReviewsByService(serviceId) {
  const reviews = await prisma.review.findMany({
    where: { serviceId },
    include: {
      user: { select: { email: true, fullName: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  // Корректная сериализация: bigint -> string, Date -> ISO string
  return serialize(reviews);
}
