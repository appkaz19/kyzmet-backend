import express from 'express';
import * as authController from './auth.controller.js';

const router = express.Router();

// Регистрация
router.post('/register', authController.register);
// Подтверждение по OTP
router.post('/verify-otp', authController.verifyOtp);
// Логин
router.post('/login', authController.login);
// Привязка Google аккаунта
router.post('/attach-google', authController.attachGoogle);
// Запрос на сброс пароля
router.post('/request-reset-password', authController.requestResetPassword);
// Подтверждение сброса пароля по OTP
router.post('/verify-reset-otp', authController.verifyResetOtp);
// Сброс пароля
router.post('/reset-password', authController.resetPassword);

export default router;
