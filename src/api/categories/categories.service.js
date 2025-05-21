import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllCategories(language = 'ru') {
  return await prisma.category.findMany({
    select: {
      id: true,
      translations: {
        where: { language },
        select: { name: true }
      }
    }
  });
}

export async function createCategory({ translations }) {
  return await prisma.category.create({
    data: {
      translations: {
        create: translations.map(t => ({
          language: t.language,
          name: t.name
        }))
      }
    }
  });
}

export async function updateCategory(id, { translations }) {
  await prisma.categoryTranslation.deleteMany({ where: { categoryId: id } });

  return await prisma.category.update({
    where: { id },
    data: {
      translations: {
        create: translations.map(t => ({
          language: t.language,
          name: t.name
        }))
      }
    }
  });
}

export async function deleteCategory(id) {
  await prisma.categoryTranslation.deleteMany({ where: { categoryId: id } });
  await prisma.category.delete({ where: { id } });
}
