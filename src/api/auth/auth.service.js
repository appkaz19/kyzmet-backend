import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { serialize } from '../../utils/serialize.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function register(phone, password) {
  if (!phone || typeof phone !== 'string') {
    throw new Error('Phone is required');
  }

  if (!password || typeof password !== 'string') {
    throw new Error('Password is required');
  }

  const existingUser = await prisma.user.findFirst({
    where: { phone }
  });

  if (existingUser) throw new Error('User already exists');

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { phone, passwordHash, verified: true }
  });

  return serialize({ message: 'User registered successfully.', user });
}


export async function login(phone, password) {
  const user = await prisma.user.findUnique({
    where: { phone }
  });

  if (!user) throw new Error('Invalid credentials');
  if (!user.verified) throw new Error('User not verified');

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

export async function resetPassword(phone, newPassword) {
  
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
