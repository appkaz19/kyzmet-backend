import { Router } from 'express';
import * as subcategoryController from './subcategories.controller.js';
import { adminMiddleware } from '../../middleware/adminMiddleware.js';

const router = Router();

// Public route
router.get('/by-category/:categoryId', subcategoryController.getSubcategoriesByCategory);

// Admin-secured routes
router.post('/', adminMiddleware, subcategoryController.createSubcategory);
router.patch('/:id', adminMiddleware, subcategoryController.updateSubcategory);
router.delete('/:id', adminMiddleware, subcategoryController.deleteSubcategory);

export default router;
