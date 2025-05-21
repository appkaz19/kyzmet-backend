import { Router } from 'express';
import * as categoryController from './categories.controller.js';
import { adminMiddleware } from '../../middleware/adminMiddleware.js';


const router = Router();

// Public route
router.get('/', categoryController.getAllCategories);

// Admin routes (secured separately)
router.post('/', adminMiddleware, categoryController.createCategory);
router.patch('/:id', adminMiddleware, categoryController.updateCategory);
router.delete('/:id', adminMiddleware, categoryController.deleteCategory);

export default router;
