import { Router } from 'express';
import * as favoritesController from './favorites.controller.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = Router();

router.get('/services', authMiddleware, favoritesController.getFavoriteServices);
router.post('/services/:id', authMiddleware, favoritesController.addFavoriteService);
router.delete('/services/:id', authMiddleware, favoritesController.removeFavoriteService);

router.get('/jobs', authMiddleware, favoritesController.getFavoriteJobs);
router.post('/jobs/:id', authMiddleware, favoritesController.addFavoriteJob);
router.delete('/jobs/:id', authMiddleware, favoritesController.removeFavoriteJob);

export default router;
