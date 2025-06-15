import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { serialize } from '../../utils/serialize.js';

export async function getTariffs() {
  const tariffs = await prisma.tariff.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' }
  });
  return serialize(tariffs);
}

export async function createTariff(data) {
  const tariff = await prisma.tariff.create({ data });
  return serialize(tariff);
}

export async function updateTariff(id, data) {
  const tariff = await prisma.tariff.update({ where: { id: Number(id) }, data });
  return serialize(tariff);
}

export async function deleteTariff(id) {
  await prisma.tariff.delete({ where: { id: Number(id) } });
  return true;
}
