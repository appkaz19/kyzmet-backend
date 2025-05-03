import { Router } from 'express';
import * as walletController from './wallet.controller.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = Router();

// Получить свой кошелек
router.get('/', authMiddleware, walletController.getMyWallet);

// Пополнить кошелек
router.post('/top-up', authMiddleware, walletController.topUpWallet);

// Потратить монеты
router.post('/spend', authMiddleware, walletController.spendFromWallet);

export default router;
