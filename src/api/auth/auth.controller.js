import * as authService from './auth.service.js';
import * as passwordResetService from '../../core/auth/passwordResetService.js';
import * as otpService from '../../core/otp/otpService.js';
import * as firebaseOtpService from '../../core/otp/firebaseOtpService.js';
import { asyncHandler } from '../../middleware/errorHandler.js';

export const register = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;
  const result = await authService.register(phone, password);
  console.log('✅ [auth] User registered:', result.user.id);
  res.status(201).json(result);
});


export const login = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;
  const result = await authService.login(phone, password);
  console.log('✅ [auth] User logged in:', result.user.id);
  res.json(result);
});

export const attachGoogle = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const { firebaseGoogleId } = req.body;
  const result = await authService.attachGoogle(userId, firebaseGoogleId);
  console.log('✅ [auth] Google attached for user:', userId);
  res.json(result);
});


// Legacy password reset (for backward compatibility)
export const resetPassword = asyncHandler(async (req, res) => {
  const { phone, newPassword } = req.body;
  const result = await passwordResetService.directPasswordReset(phone, newPassword);
  console.log('✅ [auth] Password reset (legacy) for phone:', phone);
  res.json(result);
});

// New secure password reset flow
export const requestPasswordReset = asyncHandler(async (req, res) => {
  const { phone } = req.body;
  const result = await passwordResetService.requestPasswordReset(phone);
  console.log('✅ [auth] Password reset requested for phone:', phone);
  res.json(result);
});

export const verifyResetOTP = asyncHandler(async (req, res) => {
  const { phone, otp } = req.body;
  const result = await passwordResetService.verifyResetOTP(phone, otp);
  console.log('✅ [auth] Reset OTP verified for phone:', phone);
  res.json(result);
});

export const resetPasswordWithToken = asyncHandler(async (req, res) => {
  const { resetToken, newPassword } = req.body;
  const result = await passwordResetService.resetPasswordWithToken(resetToken, newPassword);
  console.log('✅ [auth] Password reset with token completed');
  res.json(result);
});

export const adminLogin = asyncHandler(async (req, res) => {
  const { login, password } = req.body;
  const result = await authService.adminLogin(login, password);
  console.log('✅ [auth] Admin logged in:', result.admin?.id);
  res.json(result);
});

// OTP verification endpoints
export const sendOTP = asyncHandler(async (req, res) => {
  const { phone } = req.body;
  const result = await otpService.sendOTP(phone);
  console.log('✅ [auth] OTP sent to phone:', phone);
  res.json(result);
});

export const verifyPhone = asyncHandler(async (req, res) => {
  const { phone, otp } = req.body;
  const result = await otpService.verifyPhoneWithOTP(phone, otp);
  console.log('✅ [auth] Phone verified:', phone);
  res.json(result);
});

// Firebase OTP verification endpoints
export const verifyFirebasePhone = asyncHandler(async (req, res) => {
  const { idToken } = req.body;
  const result = await firebaseOtpService.verifyPhoneWithFirebase(idToken);
  console.log('✅ [auth] Phone verified via Firebase');
  res.json(result);
});

export const registerWithFirebase = asyncHandler(async (req, res) => {
  const { phone, password, idToken } = req.body;
  const result = await firebaseOtpService.registerWithFirebaseVerification(phone, password, idToken);
  console.log('✅ [auth] User registered via Firebase:', result.user.id);
  res.status(201).json(result);
});
