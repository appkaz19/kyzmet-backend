import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllRegions(language = 'ru') {
  return prisma.region.findMany({
    select: {
      id: true,
      lat: true,
      lng: true,
      translations: {
        where: { language },
        select: { name: true }
      },
      cities: {
        select: {
          id: true,
          lat: true,
          lng: true,
          translations: {
            where: { language },
            select: { name: true }
          }
        }
      }
    }
  });
}

export async function getCitiesByRegion(regionId, language = 'ru') {
  return prisma.city.findMany({
    where: { regionId },
    select: {
      id: true,
      lat: true,
      lng: true,
      translations: {
        where: { language },
        select: { name: true }
      }
    }
  });
}
