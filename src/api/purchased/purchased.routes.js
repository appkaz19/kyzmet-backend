import { Router } from 'express';
import * as purchasedController from './purchased.controller.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = Router();

router.get('/', authMiddleware, purchasedController.getMyPurchasedContacts);

export default router;
