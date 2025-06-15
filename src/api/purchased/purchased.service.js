import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getByUser(userId) {
  return prisma.purchasedContact.findMany({
    where: { userId },
    select: {
      serviceId: true,
      createdAt: true,
      service: {
        select: {
          title: true,
          user: {
            select: { phone: true, email: true, fullName: true }
          }
        }
      }
    }
  });
}

export function getTariffs() {
  return prisma.tariff.findMany({ orderBy: { order: 'asc' } });
}

export function createTariff(data) {
  return prisma.tariff.create({ data });
}

export function updateTariff(id, data) {
  return prisma.tariff.update({ where: { id: parseInt(id) }, data });
}
