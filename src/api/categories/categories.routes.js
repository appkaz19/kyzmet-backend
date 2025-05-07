import { Router } from 'express';
import * as categoryController from './categories.controller.js';

const router = Router();

// Получить все категории
router.get('/', categoryController.getAllCategories);

export default router;
