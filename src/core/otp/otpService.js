import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// In-memory storage for OTP codes (in production, use Redis)
const otpStore = new Map();

// Clean up expired OTPs every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, data] of otpStore.entries()) {
    if (now > data.expiresAt) {
      otpStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

// Generate a random 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Store OTP with expiration time
export function storeOTP(phone, otp, expirationMinutes = 5) {
  const expiresAt = Date.now() + (expirationMinutes * 60 * 1000);
  otpStore.set(phone, {
    otp,
    expiresAt,
    attempts: 0
  });
  console.log(`✅ [OTP] Generated for ${phone}: ${otp} (expires in ${expirationMinutes}min)`);
}

// Verify OTP
export function verifyOTP(phone, providedOTP) {
  const storedData = otpStore.get(phone);
  
  if (!storedData) {
    throw new Error('OTP not found or expired');
  }

  if (Date.now() > storedData.expiresAt) {
    otpStore.delete(phone);
    throw new Error('OTP expired');
  }

  // Increment attempt counter
  storedData.attempts++;

  // Max 3 attempts
  if (storedData.attempts > 3) {
    otpStore.delete(phone);
    throw new Error('Too many OTP attempts');
  }

  if (storedData.otp !== providedOTP) {
    throw new Error('Invalid OTP');
  }

  // OTP is valid, remove it
  otpStore.delete(phone);
  console.log(`✅ [OTP] Verified for ${phone}`);
  return true;
}

// Send OTP via SMS (mock implementation)
export async function sendOTP(phone) {
  try {
    const otp = generateOTP();
    
    // For development/testing, use fixed OTP
    const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
    const finalOTP = isDevelopment ? '1234' : otp;
    
    storeOTP(phone, finalOTP);

    if (isDevelopment) {
      console.log(`📱 [OTP] Development mode - OTP for ${phone}: ${finalOTP}`);
      return { success: true, message: 'OTP sent (development mode)' };
    }

    // TODO: Integrate with actual SMS provider (Twilio, AWS SNS, etc.)
    // Example:
    // await smsProvider.send(phone, `Your Kyzmet verification code is: ${otp}`);
    
    console.log(`📱 [OTP] Would send to ${phone}: ${otp}`);
    return { success: true, message: 'OTP sent successfully' };
    
  } catch (error) {
    console.error('🔥 [OTP] Send error:', error);
    throw new Error('Failed to send OTP');
  }
}

// Request OTP for phone verification
export async function requestPhoneVerification(phone) {
  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { phone }
  });

  if (!existingUser) {
    throw new Error('User not found');
  }

  if (existingUser.verified) {
    throw new Error('User already verified');
  }

  return await sendOTP(phone);
}

// Verify phone with OTP
export async function verifyPhoneWithOTP(phone, otp) {
  // Verify the OTP first
  verifyOTP(phone, otp);

  // Update user verification status
  const user = await prisma.user.findUnique({
    where: { phone }
  });

  if (!user) {
    throw new Error('User not found');
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { 
      verified: true,
      lastLoginAt: new Date()
    }
  });

  console.log(`✅ [OTP] Phone verified for user: ${user.id}`);
  return { success: true, message: 'Phone verified successfully' };
}