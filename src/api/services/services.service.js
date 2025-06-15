import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { spendFromWallet } from '../wallet/wallet.service.js';
import { serialize } from '../../utils/serialize.js';

export async function createService(userId, data) {
  const {
    title, description, price, address, images = [],
    regionId, cityId, categoryId, subcategoryId
  } = data;

  const service = await prisma.service.create({
    data: {
      title, description, price, address, images,
      regionId, cityId, categoryId, subcategoryId, userId,
      expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    }
  });

  return serialize(service);
}

export async function getServiceById(id, userId) {
  const service = await prisma.service.findUnique({
    where: { id },
    include: {
      city: { include: { translations: true } },
      category: { include: { CategoryTranslation: true } },
      subcategory: { include: { SubcategoryTranslation: true } },
      user: { select: { id: true, phone: true, email: true, fullName: true } }
    }
  });

  if (!service) throw new Error('Service not found');

  const purchased = await prisma.purchasedContact.findFirst({
    where: { userId, serviceId: id }
  });

  const result = {
    ...service,
    contactUnlocked: !!purchased,
    contact: purchased ? service.user : null
  };

  return serialize(result);
}

export async function getServices(filters = {}) {
  const {
    regionId,
    cityId,
    categoryId,
    subcategoryId,
    search,
    price,
    page = 1,
    limit = 20,
  } = filters;

  const where = { isDeleted: false, expiresAt: { gte: new Date() } };

  if (regionId) where.regionId = regionId;
  if (cityId) where.cityId = cityId;
  if (categoryId) where.categoryId = categoryId;
  if (subcategoryId) where.subcategoryId = subcategoryId;
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } }
    ];
  }
  if (price) {
    where.price = { lte: parseFloat(price) };
  }

  const take = Number(limit) > 0 ? Number(limit) : 20;
  const pageNum = Number(page) > 0 ? Number(page) : 1;

  const [total, services] = await Promise.all([
    prisma.service.count({ where }),
    prisma.service.findMany({
      where,
      include: {
        user: { select: { fullName: true } },
        reviews: true
      },
      orderBy: [{ promotedUntil: 'desc' }, { createdAt: 'desc' }],
      skip: (pageNum - 1) * take,
      take
    })
  ]);

  const result = services.map(service => {
    const ratingSum = (service.reviews || []).reduce((sum, r) => sum + (r.rating || 0), 0);
    const rating = (service.reviews && service.reviews.length) ? (ratingSum / service.reviews.length).toFixed(1) : null;

    return {
      id: service.id,
      title: service.title,
      price: service.price,
      image: Array.isArray(service.images) && service.images.length > 0 ? service.images[0] : null,
      author: service.user && service.user.fullName ? service.user.fullName : '',
      rating,
      reviewsCount: (service.reviews || []).length,
    };
  });

  return serialize({
    total,
    page: pageNum,
    limit: take,
    services: result
  });
}

export async function updateService(userId, serviceId, data) {
  const service = await prisma.service.findUnique({ where: { id: serviceId } });
  if (!service) throw new Error('Service not found');
  if (service.userId !== userId) throw new Error('Unauthorized');

  const allowedFields = [
    'title', 'description', 'price', 'address', 'images',
    'regionId', 'cityId', 'categoryId', 'subcategoryId'
  ];

  const updateData = {};
  for (const field of allowedFields) {
    if (data[field] !== undefined) updateData[field] = data[field];
  }

  const updated = await prisma.service.update({ where: { id: serviceId }, data: updateData });
  return serialize(updated);
}

export async function promoteService(userId, serviceId, tariffId) {
  const service = await prisma.service.findUnique({ where: { id: serviceId } });
  if (!service) throw new Error('Service not found');
  if (service.userId !== userId) throw new Error('Unauthorized');

  const tariff = await prisma.tariff.findFirst({ where: { id: tariffId, isActive: true } });
  if (!tariff) throw new Error('Tariff not found');

  if (tariff.price > 0) {
    await spendFromWallet(userId, tariff.price);
  }

  let promotedUntil = service.promotedUntil && service.promotedUntil > new Date() ? new Date(service.promotedUntil) : new Date();
  promotedUntil.setDate(promotedUntil.getDate() + tariff.promoDays);

  const expiresAt = new Date(service.expiresAt);
  expiresAt.setDate(expiresAt.getDate() + tariff.extraDays);

  await prisma.service.update({ where: { id: serviceId }, data: { promotedUntil, expiresAt } });

  return { message: `Service promoted with tariff ${tariff.name}.` };
}

export async function buyProviderContact(userId, serviceId) {
  const alreadyPurchased = await prisma.purchasedContact.findFirst({ where: { userId, serviceId } });

  if (!alreadyPurchased) {
    await spendFromWallet(userId, 100);
    await prisma.purchasedContact.create({ data: { userId, serviceId } });
  }

  return getServiceById(serviceId, userId);
}

export async function getMyServices(userId) {
  const services = await prisma.service.findMany({
    where: { userId, isDeleted: false },
    include: { reviews: true }
  });

  const result = services.map((service) => {
    const ratingSum = (service.reviews || []).reduce((sum, r) => sum + (r.rating || 0), 0);
    const rating = service.reviews && service.reviews.length ? (ratingSum / service.reviews.length).toFixed(1) : null;

    return {
      id: service.id,
      title: service.title,
      price: service.price,
      image: Array.isArray(service.images) && service.images.length > 0 ? service.images[0] : null,
      rating,
      reviewsCount: (service.reviews || []).length
    };
  });

  return serialize(result);
}
