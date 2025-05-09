import { Router } from 'express';
import * as subcategoryController from './subcategories.controller.js';

const router = Router();

// Получить все подкатегории по категории
router.get('/by-category/:categoryId', subcategoryController.getByCategory);

export default router;
