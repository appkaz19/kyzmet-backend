import { Router } from 'express';
import * as jobController from './jobs.controller.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = Router();

// Создать задание
router.post('/', authMiddleware, jobController.createJob);

// Получить список заданий
router.get('/', jobController.getJobs);

// Получить задание по ID
router.get('/:id', jobController.getJobById);

// Откликнуться на задание
router.post('/:id/apply', authMiddleware, jobController.applyToJob);

// Посмотреть отклики на своё задание
router.get('/:id/applications', authMiddleware, jobController.getApplicationsForJob);

// Посмотреть все свои отклики
router.get('/applications/me', authMiddleware, jobController.getMyApplications);

// Поднять задание в топ
router.post('/:id/promote', authMiddleware, jobController.promoteJob);

// Купить контакт нанимателя
router.post('/:id/contact', authMiddleware, jobController.buyEmployerContact);

export default router;
