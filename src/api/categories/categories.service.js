import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllCategories() {
  return await prisma.category.findMany({
    select: { id: true, name: true }
  });
}
