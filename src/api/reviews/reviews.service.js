import admin from '../../core/firebase.js';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

function bigintToString(obj) {
  if (Array.isArray(obj)) {
    return obj.map(bigintToString);
  } else if (typeof obj === 'object' && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, bigintToString(v)])
    );
  } else if (typeof obj === 'bigint') {
    return obj.toString(); // Вот тут!
  } else {
    return obj;
  }
}

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
  const reviews = await prisma.review.findMany({
    where: { serviceId },
    include: {
      user: { select: { email: true, fullName: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return bigintToString(reviews);
}
