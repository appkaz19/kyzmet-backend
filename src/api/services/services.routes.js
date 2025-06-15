import { Router } from 'express';
import * as serviceController from './services.controller.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = Router();

// Fetch all services (with optional filters)
router.get('/', serviceController.getServices);

// Create a new service
router.post('/', authMiddleware, serviceController.createService);

// Get current user's services
router.get('/my', authMiddleware, serviceController.getMyServices);

// Get service details by ID
router.get('/:id', authMiddleware, serviceController.getServiceById);

// Update user's own service
router.patch('/:id', authMiddleware, serviceController.updateService);

// Promote service
router.post('/:id/promote', authMiddleware, serviceController.promoteService);

// Buy provider contact
router.post('/:id/contact', authMiddleware, serviceController.buyProviderContact);

export default router;
