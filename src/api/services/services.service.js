import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { spendFromWallet } from "../wallet/wallet.service.js";

export async function createService(userId, data) {
  const { title, description, price, images, videos, locationId, categoryId, subcategoryId } = data;

  const service = await prisma.service.create({
    data: {
      title,
      description,
      price,
      images: images || [],
      videos: videos || [],
      locationId,
      categoryId,
      subcategoryId,
      userId: userId
    }
  });  

  return service;
}

export async function getServiceById(id, userId) {
  const service = await prisma.service.findUnique({
    where: { id },
    include: {
      location: true,
      category: true,
      subcategory: true,
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

  const purchased = await prisma.purchasedContact.findFirst({
    where: {
      userId,
      serviceId: id,
    }
  })

  return {
    ...service,
    contactUnlocked: !!purchased,
    contact: purchased ? service.user : null
  };
}

export async function getServices(filters) {
  const { locationId, categoryId, subcategoryId, search, price } = filters;

  const where = {};

  if (locationId) where.locationId = locationId;
  if (categoryId) where.categoryId = categoryId;
  if (subcategoryId) where.subcategoryId = subcategoryId;

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
    include: {
      user: {
        select: {
          fullName: true,
        }
      },
      reviews: true,
    },
    orderBy: { createdAt: 'desc' }
  });

  return services.map(service => {
    const ratingSum = service.reviews.reduce((sum, r) => sum + r.rating, 0);
    const rating = service.reviews.length ? (ratingSum / service.reviews.length).toFixed(1) : null;

    return {
      id: service.id,
      title: service.title,
      price: service.price,
      image: service.images.length > 0 ? service.images[0] : null,
      author: service.user.fullName,
      rating,
      reviewsCount: service.reviews.length,
    }
  });
}

export async function updateService(userId, serviceId, data) {
  const service = await prisma.service.findUnique({where: { id: serviceId }});
  if (!service) throw new Error('Service not found');
  if (service.userId !== userId) throw new Error('Unauthorized to update this service');

  const allowedFields = [
    'title', 'description', 'price', 'images', 'videos', 
    'locationId', 'categoryId', 'subcategoryId'];
  const updateData = {};
  for (const field of allowedFields) {
    if (data[field] !== undefined) updateData[field] = data[field];
  }

  const updatedService = await prisma.service.update({
    where: { id: serviceId },
    data: updateData
  });

  return updatedService;
}

export async function promoteService(userId, serviceId, days) {
  const service = await prisma.service.findUnique({ where: { id: serviceId } });

  if (!service) throw new Error('Service not found');
  if (service.userId !== userId) throw new Error('Unauthorized to promote this service');

  const cost = days === 7 ? 500 : 300;
  await spendFromWallet(userId, cost);

  const promotedUntil = new Date();
  promotedUntil.setDate(promotedUntil.getDate() + (days === 7 ? 7 : 3));

  const updatedService = await prisma.service.update({
    where: { id: serviceId },
    data: { promotedUntil }
  });

  return { message: `Service promoted for ${days} days.` };
}

export async function buyProviderContact(userId, serviceId) {
  const alreadyPurchased = await prisma.purchasedContact.findFirst({
    where: { userId, serviceId }
  });

  if (alreadyPurchased) {
    return await getServiceById(serviceId, userId);
  }

  await spendFromWallet(userId, 100);

  await prisma.purchasedContact.create({
    data: { userId, serviceId }
  });

  return await getServiceById(serviceId, userId);
}
