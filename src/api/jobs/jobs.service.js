import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { spendFromWallet } from '../wallet/wallet.service.js';

export async function createJob(userId, data) {
  const { title, description, location, price } = data;

  const job = await prisma.jobPost.create({
    data: {
      title,
      description,
      price,
      location,
      userId
    }
  });

  return job;
}

export async function getJobs(filters) {
  const { location, search, price } = filters;

  const where = {};

  if (location) {
    where.location = location;
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } }
    ];
  }

  if (price) {
    where.price = {
      lte: parseFloat(price)
    };
  }

  const jobs = await prisma.jobPost.findMany({
    where,
    include: {
      user: {
        select: {
          fullName: true,
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return jobs.map(job => {
    console.log(job);

    return {
      id: job.id,
      title: job.title,
      price: job.price,
      image: job.images.length > 0 ? job.images[0] : null,
      author: job.user.fullName ?? 'Аноним',
      location: job.location ?? 'Не указано',
    };
  });
}

export async function getJobById(id) {
  const job = await prisma.jobPost.findUnique({
    where: { id },
    include: {
      user: {
        select: { id: true, phone: true, email: true }
      }
    }
  });

  if (!job) {
    throw new Error('Job not found');
  }

  return job;
}

export async function promoteJob(userId, jobId, days) {
  const job = await prisma.jobPost.findUnique({ where: { id: jobId } });

  if (!job) {
    throw new Error('Job not found');
  }

  if (job.userId !== userId) {
    throw new Error('Unauthorized to promote this job');
  }

  const cost = days === 7 ? 500 : 300;

  await spendFromWallet(userId, cost);

  const promotedUntil = new Date();
  promotedUntil.setDate(promotedUntil.getDate() + (days === 7 ? 7 : 3));

  const updatedJob = await prisma.jobPost.update({
    where: { id: jobId },
    data: {
      promotedUntil
    }
  });

  return { message: `Job promoted for ${days} days.` };
}

export async function buyEmployerContact(userId, jobId) {
  const job = await prisma.jobPost.findUnique({
    where: { id: jobId },
    include: {
      user: {
        select: {
          phone: true,
          email: true
        }
      }
    }
  });

  if (!job) {
    throw new Error('Job not found');
  }

  await spendFromWallet(userId, 100);

  return {
    contact: {
      phone: job.user.phone,
      email: job.user.email
    }
  };
}