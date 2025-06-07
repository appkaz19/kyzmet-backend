import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { spendFromWallet } from '../wallet/wallet.service.js';
import { serialize } from '../../utils/serialize.js';

export async function createJob(userId, data) {
  const {
      title,
      description,
      price,
      images = [],
      regionId,
      cityId,
      address,
      allowChat = true,
      allowPhone = true
    } = data;

  const job = await prisma.job.create({
    data: {
      title,
      description,
      price,
      images,
      regionId,
      cityId,
      address,
      allowChat,
      allowPhone,
      userId
    }
  });
  return serialize(job);
}

export async function getJobs(filters) {
  const { regionId, cityId, search, price } = filters;
  const where = { isDeleted: false };

  if (regionId) where.regionId = regionId;
  if (cityId) where.cityId = cityId;
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } }
    ];
  }
  if (price) where.price = { lte: parseFloat(price) };

  const jobs = await prisma.job.findMany({
    where,
    include: { user: { select: { fullName: true } } },
    orderBy: [{ promotedUntil: 'desc' }, { createdAt: 'desc' }]
  });

  const result = jobs.map(job => ({
    id: job.id,
    title: job.title,
    price: job.price,
    image: job.images.length > 0 ? job.images[0] : null,
    author: job.user.fullName ?? 'Аноним',
    regionId: job.regionId,
    cityId: job.cityId,
    address: job.address || 'Не указано',
  }));
  return serialize(result);
}

export async function getJobById(id) {
  const job = await prisma.job.findUnique({
    where: { id },
    include: {
      region: { include: { translations: true } },
      city: { include: { translations: true } },
      user: { select: { id: true, phone: true, email: true, fullName: true } },
    }
  });

  if (!job) throw new Error('Job not found');
  return serialize(job);
}

export async function promoteJob(userId, jobId, days) {
  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job) throw new Error('Job not found');
  if (job.userId !== userId) throw new Error('Unauthorized');

  const cost = days === 7 ? 500 : 300;
  await spendFromWallet(userId, cost);

  const promotedUntil = new Date();
  promotedUntil.setDate(promotedUntil.getDate() + days);

  await prisma.job.update({ where: { id: jobId }, data: { promotedUntil } });

  return { message: `Job promoted for ${days} days.` };
}

export async function buyEmployerContact(userId, jobId) {
  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: { user: { select: { phone: true, email: true } } }
  });
  if (!job) throw new Error('Job not found');
  const alreadyPurchased = await prisma.purchasedContact.findFirst({
    where: { userId, jobId }
  });

  if (!alreadyPurchased) {
    await spendFromWallet(userId, 100);
    await prisma.purchasedContact.create({ data: { userId, jobId } });
  }

  return { contact: job.user };
}

export async function getMyJobs(userId) {
  const jobs = await prisma.job.findMany({
    where: { userId, isDeleted: false },
    orderBy: [{ promotedUntil: 'desc' }, { createdAt: 'desc' }]
  });

  const result = jobs.map(job => ({
    id: job.id,
    title: job.title,
    price: job.price,
    image: job.images.length > 0 ? job.images[0] : null,
    regionId: job.regionId,
    cityId: job.cityId,
    address: job.address || 'Не указано'
  }));

  return serialize(result);
}