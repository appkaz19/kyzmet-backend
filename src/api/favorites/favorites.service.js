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
    orderBy: { createdAt: 'desc' }
  });
  const serviceIds = favorites.map(f => f.serviceId);
  const services = await prisma.service.findMany({
    where: { id: { in: serviceIds } },
    include: { user: { select: { fullName: true } } }
  });
  const serviceMap = new Map(services.map(s => [s.id.toString(), s]));
  return favorites.map(f => {
    const service = serviceMap.get(f.serviceId.toString());
    return service
      ? {
          id: service.id,
          title: service.title,
          price: service.price,
          image: Array.isArray(service.images) && service.images.length > 0 ? service.images[0] : null,
          author: service.user?.fullName || ''
        }
      : null;
  }).filter(Boolean);
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
    orderBy: { createdAt: 'desc' }
  });
  const jobIds = favorites.map(f => f.jobId);
  const jobs = await prisma.job.findMany({
    where: { id: { in: jobIds } },
    include: { user: { select: { fullName: true } } }
  });
  const jobMap = new Map(jobs.map(j => [j.id.toString(), j]));
  return favorites.map(f => {
    const job = jobMap.get(f.jobId.toString());
    return job
      ? {
          id: job.id,
          title: job.title,
          price: job.price,
          image: Array.isArray(job.images) && job.images.length > 0 ? job.images[0] : null,
          author: job.user?.fullName ?? 'Аноним',
          regionId: job.regionId,
          cityId: job.cityId,
          address: job.address || 'Не указано'
        }
      : null;
  }).filter(Boolean);
}
