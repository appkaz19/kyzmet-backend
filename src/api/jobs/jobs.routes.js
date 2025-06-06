import { Router } from 'express';
import * as jobController from './jobs.controller.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = Router();

// Создать объявление
router.post('/', authMiddleware, jobController.createJob);

// Получить список объявлений
router.get('/', jobController.getJobs);

// Получить объявление по ID
router.get('/:id', jobController.getJobById);

// Поднять объявление в топ
router.post('/:id/promote', authMiddleware, jobController.promoteJob);

// Купить контакт нанимателя
router.post('/:id/contact', authMiddleware, jobController.buyEmployerContact);

// Получить свои объявления
router.get('/my', authMiddleware, jobController.getMyJobs);

export default router;
