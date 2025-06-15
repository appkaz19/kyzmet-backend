import express from 'express';
import * as authController from './auth.controller.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = express.Router();

// Регистрация
router.post('/register', authController.register);
// Логин
router.post('/login', authController.login);
// Привязка Google аккаунта
router.post('/attach-google', authMiddleware, authController.attachGoogle);
router.post('/reset-password', authController.resetPassword);

// Admin Login
router.post('/admin-login', authController.adminLogin);

export default router;
