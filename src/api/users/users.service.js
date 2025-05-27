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
      fullName: true,
      nickname: true,
      birthdate: true,
      avatarUrl: true,
      regionId: true,
      cityId: true,
      createdAt: true
    }
  });

  if (!user) throw new Error('User not found');

  return user;
}

export async function updateUser(id, data) {
  const allowedFields = [
    'email',
    'phone',
    'fullName',
    'nickname',
    'birthdate',
    'regionId',
    'cityId',
    'avatarUrl'
  ];
  
  const updateData = {};

  for (const field of allowedFields) {
    if (data[field] !== undefined) {
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
      fullName: true,
      nickname: true,
      birthdate: true,
      avatarUrl: true,
      regionId: true,
      cityId: true,
      createdAt: true
    }
  });

  return user;
}

export async function updatePushToken(userId, pushToken) {
  return prisma.user.update({
    where: { id: userId },
    data: { pushToken },
  });
}