import express from 'express';
import { authMiddleware } from '../../middleware/authMiddleware.js';
import * as controller from './reviews.controller.js';

const router = express.Router();

// POST /reviews — оставить отзыв на услугу
router.post('/', authMiddleware, controller.submitReview);

// GET /reviews?serviceId=... — получить отзывы по услуге
router.get('/', controller.getReviews);

export default router;
