import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { spendFromWallet } from '../wallet/wallet.service.js';

export async function createJob(userId, data) {
  const { title, description, category, location } = data;

  const job = await prisma.jobPost.create({
    data: {
      title,
      description,
      category,
      location,
      userId
    }
  });

  return job;
}

export async function getJobs(filters) {
  const { category, location, search } = filters;

  const where = {};

  if (category) {
    where.category = category;
  }

  if (location) {
    where.location = location;
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } }
    ];
  }

  const jobs = await prisma.jobPost.findMany({
    where,
    orderBy: { createdAt: 'desc' }
  });

  return jobs;
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

export async function applyToJob(userId, jobId, message) {
  const job = await prisma.jobPost.findUnique({ where: { id: jobId } });

  if (!job) {
    throw new Error('Job not found');
  }

  // Нельзя откликнуться на своё задание
  if (job.userId === userId) {
    throw new Error('Cannot apply to your own job');
  }

  const application = await prisma.jobApplication.create({
    data: {
      jobPostId: jobId,
      userId,
      message
    }
  });

  return application;
}

export async function getApplicationsForJob(userId, jobId) {
  const job = await prisma.jobPost.findUnique({ where: { id: jobId } });

  if (!job) {
    throw new Error('Job not found');
  }

  if (job.userId !== userId) {
    throw new Error('Unauthorized to view applications for this job');
  }

  const applications = await prisma.jobApplication.findMany({
    where: { jobPostId: jobId },
    include: {
      user: {
        select: { id: true, phone: true, email: true }
      }
    }
  });

  return applications;
}

export async function getMyApplications(userId) {
  const applications = await prisma.jobApplication.findMany({
    where: { userId },
    include: {
      jobPost: true
    }
  });

  return applications;
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