import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Фиксированный код для MVP
const FIXED_OTP = '0000';

export async function register(phone, password) {
  const existingUser = await prisma.user.findFirst({
    where: {
      phone
    }
  });

  if (existingUser) {
    throw new Error('User already exists');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      phone,
      passwordHash
    }
  });

  // На реальном проекте — отправить SMS здесь
  return { message: 'User registered successfully. OTP sent.', user };
}

export async function verifyOtp(phone, otp) {
  if (otp !== FIXED_OTP) {
    throw new Error('Invalid OTP');
  }

  const user = await prisma.user.findUnique({
    where: { phone }
  });

  if (!user) {
    throw new Error('User not found');
  }

  return { message: 'Phone number verified successfully' };
}

export async function login(phone, password) {
  const user = await prisma.user.findUnique({
    where: {
      phone
    }
  });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET || 'SECRET_KEY', // Использовать нормальный секрет на проде
    { expiresIn: '7d' }
  );

  return { token, user };
}

export async function attachGoogle(userId, firebaseGoogleId) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new Error('User not found');
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      googleId: firebaseGoogleId
    }
  });

  return { message: 'Google account attached successfully' };
}

export async function requestResetPassword(phone) {
  const user = await prisma.user.findUnique({ where: { phone } });

  if (!user) {
    throw new Error('User not found');
  }

  // Здесь бы отправить SMS с OTP, но пока фиксация на 0000
  return { message: 'OTP sent to phone' };
}

export async function resetPassword(phone, otp, newPassword) {
  if (otp !== FIXED_OTP) {
    throw new Error('Invalid OTP');
  }

  const user = await prisma.user.findUnique({ where: { phone } });

  if (!user) {
    throw new Error('User not found');
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash }
  });

  return { message: 'Password reset successfully' };
}
