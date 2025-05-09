import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getByUser(userId) {
  return prisma.purchasedContact.findMany({
    where: { userId },
    select: {
      serviceId: true,
      createdAt: true
    }
  });
}
