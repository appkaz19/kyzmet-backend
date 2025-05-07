import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { spendFromWallet } from "../wallet/wallet.service.js";

export async function createService(userId, data) {
  const { title, description, price, images, videos, locationId, categoryId } = data;

  const service = await prisma.service.create({
    data: {
      title,
      description,
      price,
      images: images || [],
      videos: videos || [],
      locationId,
      categoryId,
      userId: userId
    }
  });  

  return service;
}

export async function getServiceById(id) {
  const service = await prisma.service.findUnique({
    where: { id },
    include: {
      location: true,
      user: {
        select: {
          id: true,
          phone: true,
          email: true
        }
      }
    }
  });

  if (!service) {
    throw new Error('Service not found');
  }

  return service;
}

export async function getServices(filters) {
  const { locationId, categoryId, search, price } = filters;

  const where = {};

  if (locationId) {
    where.locationId = locationId;
  }

  if (categoryId) {
    where.categoryId = categoryId;
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

  const services = await prisma.service.findMany({
    where,
    orderBy: { createdAt: 'desc' }
  });

  return services;
}

export async function updateService(userId, serviceId, data) {
  const service = await prisma.service.findUnique({
    where: { id: serviceId }
  });

  if (!service) {
    throw new Error('Service not found');
  }

  if (service.userId !== userId) {
    throw new Error('Unauthorized to update this service');
  }

  const allowedFields = ['title', 'description', 'price', 'images', 'videos', 'locationId', 'categoryId'];
  const updateData = {};

  for (const field of allowedFields) {
    if (data[field] !== undefined) {
      updateData[field] = data[field];
    }
  }

  const updatedService = await prisma.service.update({
    where: { id: serviceId },
    data: updateData
  });

  return updatedService;
}

export async function promoteService(userId, serviceId, days) {
  const service = await prisma.service.findUnique({ where: { id: serviceId } });

  if (!service) {
    throw new Error('Service not found');
  }

  if (service.userId !== userId) {
    throw new Error('Unauthorized to promote this service');
  }

  const cost = days === 7 ? 500 : 300;

  await spendFromWallet(userId, cost);

  const promotedUntil = new Date();
  promotedUntil.setDate(promotedUntil.getDate() + (days === 7 ? 7 : 3));

  const updatedService = await prisma.service.update({
    where: { id: serviceId },
    data: {
      promotedUntil
    }
  });

  return { message: `Service promoted for ${days} days.` };
}

export async function buyProviderContact(userId, serviceId) {
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    include: {
      user: {
        select: {
          phone: true,
          email: true
        }
      }
    }
  });

  if (!service) {
    throw new Error('Service not found');
  }

  await spendFromWallet(userId, 100);

  return {
    contact: {
      phone: service.user.phone,
      email: service.user.email
    }
  };
}
