import { Router } from 'express';
import { authMiddleware } from '../../middleware/authMiddleware.js';
import * as reviewController from './reviews.controller.js';

const router = Router();

// Оставить отзыв на услугу
router.post('/', authMiddleware, reviewController.submitReview);

// Получить отзывы по услуге
router.get('/', reviewController.getReviews);

export default router;
