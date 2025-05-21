import express from 'express';
import * as authController from './auth.controller.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';
import { requireOtpToken } from '../../middleware/requireOtpToken.js';

const router = express.Router();

// Регистрация
router.post('/register', authController.register);
// Подтверждение по OTP
router.post('/verify-otp', authController.verifyOtp);
// Логин
router.post('/login', authController.login);
// Привязка Google аккаунта
router.post('/attach-google', authMiddleware, authController.attachGoogle);
// Запрос на сброс пароля
router.post('/request-reset-password', authController.requestResetPassword);
// Подтверждение сброса пароля по OTP
router.post('/verify-reset-otp', authController.verifyResetOtp);
// Сброс пароля
router.post('/reset-password', requireOtpToken('reset_password'), authController.resetPassword);

// Admin Login
router.post('/admin-login', authController.adminLogin);

export default router;
