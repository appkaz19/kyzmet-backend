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

  return { message: 'Review submitted', review };
}

export async function getReviewsByService(serviceId) {
  if (!serviceId) {
    throw new Error('Missing serviceId in query');
  }

  return prisma.review.findMany({
    where: { serviceId },
    include: {
      user: { select: { email: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
}
