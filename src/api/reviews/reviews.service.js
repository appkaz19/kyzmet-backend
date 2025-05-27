import admin from '../../core/firebase.js';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function submitReview(userId, data) {
  const { serviceId, rating, comment } = data;

  if (!serviceId || !rating) {
    throw new Error('serviceId and rating are required');
  }

  const review = await prisma.review.create({
    data: {
      serviceId,
      userId,
      rating,
      comment,
    },
  });

  const avgRating = await prisma.review.aggregate({
    where: { serviceId },
    _avg: { rating: true },
  });

  await prisma.service.update({
    where: { id: serviceId },
    data: { rating: avgRating._avg.rating || 0 },
  });

  const recepient = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (recepient?.pushToken) {
    await admin.messaging().send({
      token: recepient.pushToken,
      notification: {
        title: '⭐ New Review',
        body: `You received a new review: ${text.slice(0, 100)}`,
      },
      data: {
        type: 'review',
      }
    });
  }

  return { message: 'Review submitted', review };
}

export async function getReviewsByService(serviceId) {
  return prisma.review.findMany({
    where: { serviceId },
    include: {
      user: { select: { email: true, fullName: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
}
