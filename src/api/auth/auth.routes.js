import express from 'express';
import * as authController from './auth.controller.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';
import { 
  validateRegistration, 
  validateLogin, 
  validatePasswordReset, 
  validateAdminLogin,
  validateAttachGoogle,
  validatePhoneOnly,
  validateOTP,
  validateResetToken
} from '../../middleware/validationMiddleware.js';
import { 
  authRateLimit, 
  passwordResetRateLimit 
} from '../../middleware/rateLimitMiddleware.js';
import { errorMiddleware } from '../../middleware/errorHandler.js';

const router = express.Router();

// User Registration
router.post('/register', 
  authRateLimit,
  validateRegistration, 
  authController.register
);

// User Login
router.post('/login', 
  authRateLimit,
  validateLogin, 
  authController.login
);

// Attach Google Account
router.post('/attach-google', 
  authMiddleware,
  validateAttachGoogle, 
  authController.attachGoogle
);

// Password Reset (Legacy)
router.post('/reset-password', 
  passwordResetRateLimit,
  validatePasswordReset, 
  authController.resetPassword
);

// New Secure Password Reset Flow
router.post('/request-password-reset', 
  passwordResetRateLimit,
  validatePhoneOnly,
  authController.requestPasswordReset
);

router.post('/verify-reset-otp', 
  passwordResetRateLimit,
  validateOTP,
  authController.verifyResetOTP
);

router.post('/reset-password-with-token', 
  passwordResetRateLimit,
  validateResetToken,
  authController.resetPasswordWithToken
);

// OTP Verification
router.post('/send-otp', 
  authRateLimit,
  validatePhoneOnly,
  authController.sendOTP
);

router.post('/verify-phone', 
  authRateLimit,
  validateOTP,
  authController.verifyPhone
);

// Admin Login
router.post('/admin-login', 
  authRateLimit,
  validateAdminLogin, 
  authController.adminLogin
);

// Error handling middleware
router.use(errorMiddleware);

export default router;
