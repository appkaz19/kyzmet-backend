import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getByCategory(categoryId) {
  return prisma.subcategory.findMany({
    where: { categoryId },
    select: { id: true, name: true }
  });
}