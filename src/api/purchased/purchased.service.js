import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { serialize } from '../../utils/serialize.js';

export async function getByUser(userId) {
  const records = await prisma.purchasedContact.findMany({
    where: { userId },
    select: {
      serviceId: true,
      jobId: true,
      createdAt: true,
      service: {
        select: {
          title: true,
          user: {
            select: { phone: true, email: true, fullName: true }
          }
        }
      },
      job: {
        select: {
          title: true,
          user: {
            select: { phone: true, email: true, fullName: true }
          }
        }
      }
    }
  });
  return serialize(records);
}
