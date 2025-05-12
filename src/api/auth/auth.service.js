import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { otpProvider } from '../../core/otp';

export async function register(phone, password) {
  const existingUser = await prisma.user.findFirst({
    where: { phone }
  });

  if (existingUser) throw new Error('User already exists');

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { phone, passwordHash }
  });

  await otpProvider.sendOtp(phone);
  return { message: 'User registered successfully. OTP sent.', user };
}

export async function verifyOtp(phone, otp) {
  const isValid = await otpProvider.verifyOtp(phone, otp);
  if (!isValid) throw new Error('Invalid OTP');

  const user = await prisma.user.findUnique({
    where: { phone }
  });

  if (!user) throw new Error('User not found');

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET || 'SECRET_KEY', // Использовать нормальный секрет на проде
    { expiresIn: '7d' }
  )
  return { 
    message: 'Phone number verified successfully',
    token,
    user,
  };
}

export async function login(phone, password) {
  const user = await prisma.user.findUnique({
    where: { phone }
  });

  if (!user) throw new Error('Invalid credentials');

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) throw new Error('Invalid credentials');

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET || 'SECRET_KEY', // Использовать нормальный секрет на проде
    { expiresIn: '7d' }
  );
  return { token, user };
}

export async function attachGoogle(userId, firebaseGoogleId) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) throw new Error('User not found');

  await prisma.user.update({
    where: { id: userId },
    data: { googleId: firebaseGoogleId }
  });

  return { message: 'Google account attached successfully' };
}

export async function requestResetPassword(phone) {
  const user = await prisma.user.findUnique({ where: { phone } });

  if (!user) throw new Error('User not found');

  await otpProvider.sendOtp(phone);
  return { message: 'OTP sent to phone' };
}

export async function verifyResetOtp(phone, otp) {
  const user = await prisma.user.findUnique({ where: { phone } });

  if (!user) throw new Error('User not found');

  const isValid = await otpProvider.verifyOtp(phone, otp);
  if (!isValid) throw new Error('Invalid OTP');

  const otpToken = jwt.sign(
    { phone, purpose: 'reset_password' },
    process.env.JWT_SECRET,
    { expiresIn: '10m' }
  );
  return { message: 'OTP verified successfully', otpToken };
}

export async function resetPassword(payload, newPassword) {
  const { phone } = payload;
  
  const user = await prisma.user.findUnique({ where: { phone } });
  if (!user) throw new Error('User not found');

  const passwordHash = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash }
  });

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET || 'SECRET_KEY', // Использовать нормальный секрет на проде
    { expiresIn: '7d' }
  )
  return { 
    message: 'Password reset successfully',
    token,
    user
  };
}
