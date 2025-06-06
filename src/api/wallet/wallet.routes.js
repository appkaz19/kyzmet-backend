import { Router } from 'express';
import * as walletController from './wallet.controller.js';
import * as paymentMethodsController from './payment-methods.controller.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = Router();

// Получить свой кошелек
router.get('/', authMiddleware, walletController.getMyWallet);

// Пополнить кошелек
router.post('/top-up', authMiddleware, walletController.topUpWallet);

// Потратить монеты
router.post('/spend', authMiddleware, walletController.spendFromWallet);
router.get('/transactions', authMiddleware, walletController.getTransactionHistory);

router.get('/payment-methods', authMiddleware, paymentMethodsController.getPaymentMethods);
router.post('/payment-methods', authMiddleware, paymentMethodsController.addPaymentMethod);
router.delete('/payment-methods/:methodId', authMiddleware, paymentMethodsController.deletePaymentMethod);
router.post('/payment-methods/:methodId/set-default', authMiddleware, paymentMethodsController.setDefaultPaymentMethod);

router.post('/webhooks/:provider', walletController.handlePaymentWebhook);

export default router;
