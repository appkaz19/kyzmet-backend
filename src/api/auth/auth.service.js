import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { serialize } from '../../utils/serialize.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { fixedOtpProvider } from '../../core/otp/index.js';

export async function register(phone, password) {
  const existingUser = await prisma.user.findFirst({
    where: { phone }
  });

  if (existingUser) throw new Error('User already exists');

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { phone, passwordHash }
  });

  await fixedOtpProvider.sendOtp(phone);
  return serialize({ message: 'User registered successfully. OTP sent.', user });
}

export async function verifyOtp(phone, otp) {
  const isValid = await fixedOtpProvider.verifyOtp(phone, otp);
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
  return serialize({
    message: 'Phone number verified successfully',
    token,
    user,
  });
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
  return serialize({ token, user });
}

export async function attachGoogle(userId, firebaseGoogleId) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) throw new Error('User not found');

  await prisma.user.update({
    where: { id: userId },
    data: { googleId: firebaseGoogleId }
  });

  return serialize({ message: 'Google account attached successfully' });
}

export async function requestResetPassword(phone) {
  const user = await prisma.user.findUnique({ where: { phone } });

  if (!user) throw new Error('User not found');

  await fixedOtpProvider.sendOtp(phone);
  return serialize({ message: 'OTP sent to phone' });
}

export async function verifyResetOtp(phone, otp) {
  const user = await prisma.user.findUnique({ where: { phone } });

  if (!user) throw new Error('User not found');

  const isValid = await fixedOtpProvider.verifyOtp(phone, otp);
  if (!isValid) throw new Error('Invalid OTP');

  const otpToken = jwt.sign(
    { phone, purpose: 'reset_password' },
    process.env.JWT_SECRET,
    { expiresIn: '10m' }
  );
  return serialize({ message: 'OTP verified successfully', otpToken });
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
  return serialize({
    message: 'Password reset successfully',
    token,
    user
  });
}

export async function adminLogin(email, password) {
  const admin = await prisma.admin.findUnique({ where: { email } });

  if (!admin) throw new Error('Invalid credentials');

  const isValid = await bcrypt.compare(password, admin.passwordHash);
  if (!isValid) throw new Error('Invalid credentials');

  const token = jwt.sign(
    { adminId: admin.id, role: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return serialize({ token, admin: { id: admin.id, email: admin.email } });
}
