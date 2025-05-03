import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getUserById(id) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      phone: true,
      googleId: true,
      createdAt: true
    }
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

export async function updateUser(id, data) {
  const allowedFields = ['email', 'phone']; // Разрешаем менять только email и телефон
  const updateData = {};

  for (const field of allowedFields) {
    if (data[field]) {
      updateData[field] = data[field];
    }
  }

  if (Object.keys(updateData).length === 0) {
    throw new Error('No valid fields provided for update');
  }

  const user = await prisma.user.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      email: true,
      phone: true,
      googleId: true,
      createdAt: true
    }
  });

  return user;
}
