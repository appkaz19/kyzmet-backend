import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { serialize } from '../../utils/serialize.js';

export async function getAllRegions(language = 'ru') {
  const regions = await prisma.region.findMany({
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
  return serialize(regions);
}

export async function getCitiesByRegion(regionId, language = 'ru') {
  const cities = await prisma.city.findMany({
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
  return serialize(cities);
}
