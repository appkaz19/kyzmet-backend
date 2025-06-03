import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { serialize } from '../../utils/serialize.js';

export async function getSubcategoriesByCategory(categoryId, language = 'ru') {
  const subcategories = await prisma.subcategory.findMany({
    where: { categoryId },
    select: {
      id: true,
      SubcategoryTranslation: {
        where: { language },
        select: { name: true }
      }
    }
  });
  return serialize(subcategories);
}

export async function createSubcategory({ categoryId, translations }) {
  const subcategory = await prisma.subcategory.create({
    data: {
      categoryId,
      SubcategoryTranslation: {
        create: translations.map(t => ({
          language: t.language,
          name: t.name
        }))
      }
    }
  });
  return serialize(subcategory);
}

export async function updateSubcategory(id, { translations }) {
  await prisma.subcategoryTranslation.deleteMany({ where: { subcategoryId: id } });

  const updated = await prisma.subcategory.update({
    where: { id },
    data: {
      SubcategoryTranslation: {
        create: translations.map(t => ({
          language: t.language,
          name: t.name
        }))
      }
    }
  });
  return serialize(updated);
}

export async function deleteSubcategory(id) {
  await prisma.subcategoryTranslation.deleteMany({ where: { subcategoryId: id } });
  await prisma.subcategory.delete({ where: { id } });
}
