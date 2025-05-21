import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getSubcategoriesByCategory(categoryId, language = 'ru') {
  return prisma.subcategory.findMany({
    where: { categoryId },
    select: {
      id: true,
      translations: {
        where: { language },
        select: { name: true }
      }
    }
  });
}

export async function createSubcategory({ categoryId, translations }) {
  return prisma.subcategory.create({
    data: {
      categoryId,
      translations: {
        create: translations.map(t => ({
          language: t.language,
          name: t.name
        }))
      }
    }
  });
}

export async function updateSubcategory(id, { translations }) {
  await prisma.subcategoryTranslation.deleteMany({ where: { subcategoryId: id } });

  return prisma.subcategory.update({
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

export async function deleteSubcategory(id) {
  await prisma.subcategoryTranslation.deleteMany({ where: { subcategoryId: id } });
  await prisma.subcategory.delete({ where: { id } });
}
