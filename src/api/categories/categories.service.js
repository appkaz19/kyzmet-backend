import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { serialize } from '../../utils/serialize.js';

export async function getAllCategories(language = 'ru') {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      CategoryTranslation: {
        where: { language },
        select: { name: true }
      }
    }
  });
  return serialize(categories);
}

export async function createCategory({ translations }) {
  const category = await prisma.category.create({
    data: {
      CategoryTranslation: {
        create: translations.map(t => ({
          language: t.language,
          name: t.name
        }))
      }
    }
  });
  return serialize(category);
}

export async function updateCategory(id, { translations }) {
  await prisma.categoryTranslation.deleteMany({ where: { categoryId: id } });

  const updated = await prisma.category.update({
    where: { id },
    data: {
      CategoryTranslation: {
        create: translations.map(t => ({
          language: t.language,
          name: t.name
        }))
      }
    }
  });
  return serialize(updated);
}

export async function deleteCategory(id) {
  await prisma.categoryTranslation.deleteMany({ where: { categoryId: id } });
  await prisma.category.delete({ where: { id } });
}
