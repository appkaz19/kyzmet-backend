import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const locations = [
    { name: 'Алматы', lat: 43.238949, lng: 76.889709 },
    { name: 'Астана', lat: 51.160523, lng: 71.470356 },
    { name: 'Шымкент', lat: 42.341709, lng: 69.590103 },
    { name: 'Караганда', lat: 49.80468, lng: 73.10938 },
    { name: 'Павлодар', lat: 52.2871, lng: 76.9674 },
  ];

  for (const loc of locations) {
    const exists = await prisma.location.findFirst({
      where: { name: loc.name },
    });

    if (!exists) {
      await prisma.location.create({
        data: loc,
      });
      console.log(`✅ Добавлена локация: ${loc.name}`);
    } else {
      console.log(`ℹ️ Локация уже существует: ${loc.name}`);
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('✅ Сидинг локаций завершен.');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
