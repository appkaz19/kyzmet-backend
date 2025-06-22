import admin from '../firebase.js';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

/**
 * Verify Firebase ID Token and extract phone number
 * @param {string} idToken - Firebase ID Token from client
 * @returns {Promise<{phoneNumber: string, uid: string}>}
 */
export async function verifyFirebaseIdToken(idToken) {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    if (!decodedToken.phone_number) {
      throw new Error('Phone number not found in Firebase token');
    }

    console.log(`✅ [Firebase OTP] Token verified for phone: ${decodedToken.phone_number}`);
    
    return {
      phoneNumber: decodedToken.phone_number,
      uid: decodedToken.uid,
      email: decodedToken.email
    };
  } catch (error) {
    console.error('🔥 [Firebase OTP] Token verification failed:', error.message);
    throw new Error('Invalid Firebase token');
  }
}

/**
 * Verify phone using Firebase ID Token
 * @param {string} idToken - Firebase ID Token
 * @returns {Promise<{success: boolean, message: string, user?: object}>}
 */
export async function verifyPhoneWithFirebase(idToken) {
  try {
    // Verify Firebase token and extract phone number
    const { phoneNumber, uid } = await verifyFirebaseIdToken(idToken);
    
    // Find user by phone number
    const user = await prisma.user.findUnique({
      where: { phone: phoneNumber }
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Update user verification status and Firebase UID
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { 
        verified: true,
        firebaseUid: uid,
        lastLoginAt: new Date()
      }
    });

    console.log(`✅ [Firebase OTP] Phone verified via Firebase for user: ${user.id}`);
    
    return { 
      success: true, 
      message: 'Phone verified successfully via Firebase',
      user: {
        id: updatedUser.id,
        phone: updatedUser.phone,
        verified: updatedUser.verified
      }
    };
  } catch (error) {
    console.error('🔥 [Firebase OTP] Verification error:', error.message);
    throw error;
  }
}

/**
 * Register user with Firebase verification
 * @param {string} phone - Phone number
 * @param {string} password - User password
 * @param {string} idToken - Firebase ID Token
 * @returns {Promise<{success: boolean, message: string, user: object}>}
 */
export async function registerWithFirebaseVerification(phone, password, idToken) {
  try {
    // Verify Firebase token
    const { phoneNumber, uid } = await verifyFirebaseIdToken(idToken);
    
    // Ensure phone numbers match
    if (phoneNumber !== phone) {
      throw new Error('Phone number mismatch between request and Firebase token');
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { phone }
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create user with Firebase verification
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { 
        phone, 
        passwordHash, 
        verified: true, // Immediately verified via Firebase
        firebaseUid: uid
      }
    });

    console.log(`✅ [Firebase OTP] User registered and verified via Firebase: ${user.id}`);
    
    return {
      success: true,
      message: 'User registered and verified successfully via Firebase',
      user: {
        id: user.id,
        phone: user.phone,
        verified: user.verified
      }
    };
  } catch (error) {
    console.error('🔥 [Firebase OTP] Registration error:', error.message);
    throw error;
  }
}