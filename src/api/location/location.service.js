import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAll() {
  return prisma.location.findMany({
    select: { id: true, name: true }
  });
}
