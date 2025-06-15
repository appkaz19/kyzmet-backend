import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { spendFromWallet } from '../wallet/wallet.service.js';

export async function createJob(userId, data) {
  const {
      title, description, price, images = [], videos = [],
      regionId, cityId, address
    } = data;

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 14);

  return prisma.job.create({
    data: {
      title, description, price,
      images, videos, regionId,
      cityId, address, userId,
      expiresAt
    }
  });
}

export async function getJobs(filters) {
  const { regionId, cityId, search, price } = filters;
  const where = { isDeleted: false, expiresAt: { gt: new Date() } };

  if (regionId) where.regionId = regionId;
  if (cityId) where.cityId = cityId;
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } }
    ];
  }
  if (price) where.price = { lte: parseFloat(price) };

  const jobs = await prisma.jobPost.findMany({
    where,
    include: { user: { select: { fullName: true } } },
    orderBy: [{ promotedUntil: 'desc' }, { createdAt: 'desc' }]
  });

  return jobs.map(job => {
    return {
      id: job.id,
      title: job.title,
      price: job.price,
      image: job.images.length > 0 ? job.images[0] : null,
      author: job.user.fullName ?? 'Аноним',
      regionId: job.regionId,
      cityId: job.cityId,
      address: job.address || 'Не указано'
    };
  });
}

export async function getJobById(id) {
  const job = await prisma.job.findUnique({
    where: { id },
    include: {
      region: { include: { translations: true } },
      city: { include: { translations: true } },
      user: { select: { id: true, phone: true, email: true, fullName: true } }
    }
  });

  if (!job) throw new Error('Job not found');
  return job;
}

export async function promoteJob(userId, jobId, tariffId) {
  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job) throw new Error('Job not found');
  if (job.userId !== userId) throw new Error('Unauthorized');

  const tariff = await prisma.tariff.findUnique({ where: { id: tariffId } });
  if (!tariff) throw new Error('Tariff not found');

  if (tariff.price > 0) await spendFromWallet(userId, tariff.price);

  const now = new Date();
  let promotedUntil = job.promotedUntil && job.promotedUntil > now ? job.promotedUntil : now;
  promotedUntil.setDate(promotedUntil.getDate() + tariff.promoDays);

  let expiresAt = job.expiresAt && job.expiresAt > now ? job.expiresAt : now;
  expiresAt.setDate(expiresAt.getDate() + tariff.extraDays);

  await prisma.job.update({ where: { id: jobId }, data: { promotedUntil, expiresAt } });

  return { message: `Job promoted with tariff ${tariffId}.` };
}

export async function buyEmployerContact(userId, jobId) {
  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: { user: { select: { phone: true, email: true } } }
  });
  if (!job) throw new Error('Job not found');

  await spendFromWallet(userId, 100);

  return { contact: job.user };
}