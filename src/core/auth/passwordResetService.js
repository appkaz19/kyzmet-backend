import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { sendOTP, verifyOTP } from '../otp/otpService.js';

const prisma = new PrismaClient();

// In-memory storage for reset tokens (use Redis in production)
const resetTokenStore = new Map();

// Clean up expired tokens every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [token, data] of resetTokenStore.entries()) {
    if (now > data.expiresAt) {
      resetTokenStore.delete(token);
    }
  }
}, 10 * 60 * 1000);

// Generate secure reset token
function generateResetToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Store reset token with expiration
function storeResetToken(token, phone, expirationMinutes = 30) {
  const expiresAt = Date.now() + (expirationMinutes * 60 * 1000);
  resetTokenStore.set(token, {
    phone,
    expiresAt,
    used: false
  });
  console.log(`✅ [Reset] Token generated for ${phone} (expires in ${expirationMinutes}min)`);
}

// Verify reset token
function verifyResetToken(token) {
  const tokenData = resetTokenStore.get(token);
  
  if (!tokenData) {
    throw new Error('Invalid or expired reset token');
  }

  if (Date.now() > tokenData.expiresAt) {
    resetTokenStore.delete(token);
    throw new Error('Reset token expired');
  }

  if (tokenData.used) {
    throw new Error('Reset token already used');
  }

  return tokenData;
}

// Mark token as used
function markTokenAsUsed(token) {
  const tokenData = resetTokenStore.get(token);
  if (tokenData) {
    tokenData.used = true;
  }
}

// Step 1: Request password reset (sends OTP)
export async function requestPasswordReset(phone) {
  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { phone }
  });

  if (!user) {
    // Don't reveal if user exists for security
    return { success: true, message: 'If the phone number exists, an OTP has been sent' };
  }

  // Send OTP for verification
  await sendOTP(phone);
  
  return { success: true, message: 'OTP sent for password reset verification' };
}

// Step 2: Verify OTP and get reset token
export async function verifyResetOTP(phone, otp) {
  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { phone }
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Verify OTP
  verifyOTP(phone, otp);

  // Generate reset token
  const resetToken = generateResetToken();
  storeResetToken(resetToken, phone);

  console.log(`✅ [Reset] OTP verified, token issued for ${phone}`);
  
  return { 
    success: true, 
    resetToken,
    message: 'OTP verified. Use the reset token to change your password.',
    expiresIn: '30 minutes'
  };
}

// Step 3: Reset password using token
export async function resetPasswordWithToken(resetToken, newPassword) {
  // Verify reset token
  const tokenData = verifyResetToken(resetToken);
  
  // Find user
  const user = await prisma.user.findUnique({
    where: { phone: tokenData.phone }
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Hash new password
  const passwordHash = await bcrypt.hash(newPassword, 10);

  // Update password
  await prisma.user.update({
    where: { id: user.id },
    data: { 
      passwordHash,
      lastLoginAt: new Date()
    }
  });

  // Mark token as used
  markTokenAsUsed(resetToken);

  console.log(`✅ [Reset] Password changed for user: ${user.id}`);
  
  return { 
    success: true, 
    message: 'Password reset successfully',
    userId: user.id
  };
}

// Legacy support - direct password reset (less secure)
export async function directPasswordReset(phone, newPassword) {
  console.warn('⚠️  [Reset] Using legacy direct password reset - consider using token-based flow');
  
  const user = await prisma.user.findUnique({ 
    where: { phone } 
  });
  
  if (!user) {
    throw new Error('User not found');
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash }
  });

  return { 
    success: true, 
    message: 'Password reset successfully (legacy method)',
    user: {
      id: user.id,
      phone: user.phone,
      verified: user.verified
    }
  };
}