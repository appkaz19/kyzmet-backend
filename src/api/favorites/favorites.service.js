import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function addFavoriteService(userId, serviceId) {
  await prisma.favoriteService.upsert({
    where: { userId_serviceId: { userId, serviceId } },
    update: {},
    create: { userId, serviceId }
  });
  return { message: 'Added to favorites' };
}

export async function removeFavoriteService(userId, serviceId) {
  await prisma.favoriteService.deleteMany({ where: { userId, serviceId } });
}

export async function getFavoriteServices(userId) {
  const favorites = await prisma.favoriteService.findMany({
    where: { userId },
    include: { service: { include: { user: { select: { fullName: true } } } } },
    orderBy: { createdAt: 'desc' }
  });
  return JSON.parse(
    JSON.stringify(
      favorites.map(f => ({
        id: f.service.id,
        title: f.service.title,
        price: f.service.price,
        image: Array.isArray(f.service.images) && f.service.images.length > 0 ? f.service.images[0] : null,
        author: f.service.user?.fullName || ''
      })),
      (k, v) => typeof v === 'bigint' ? v.toString() : v
    )
  );
}

export async function addFavoriteJob(userId, jobId) {
  await prisma.favoriteJob.upsert({
    where: { userId_jobId: { userId, jobId } },
    update: {},
    create: { userId, jobId }
  });
  return { message: 'Added to favorites' };
}

export async function removeFavoriteJob(userId, jobId) {
  await prisma.favoriteJob.deleteMany({ where: { userId, jobId } });
}

export async function getFavoriteJobs(userId) {
  const favorites = await prisma.favoriteJob.findMany({
    where: { userId },
    include: { job: { include: { user: { select: { fullName: true } } } } },
    orderBy: { createdAt: 'desc' }
  });
  return favorites.map(f => ({
    id: f.job.id,
    title: f.job.title,
    price: f.job.price,
    image: f.job.images.length > 0 ? f.job.images[0] : null,
    author: f.job.user.fullName ?? 'Аноним',
    regionId: f.job.regionId,
    cityId: f.job.cityId,
    address: f.job.address || 'Не указано'
  }));
}
