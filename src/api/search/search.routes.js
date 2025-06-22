import express from 'express';
import * as searchController from './search.controller.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';
import { generalRateLimit } from '../../middleware/rateLimitMiddleware.js';
import { errorMiddleware } from '../../middleware/errorHandler.js';

const router = express.Router();

// Global search - no auth required, available to everyone
router.get('/', 
  generalRateLimit,
  searchController.globalSearch
);

// Search suggestions/autocomplete
router.get('/suggestions',
  generalRateLimit,
  searchController.searchSuggestions
);

// Error handling middleware
router.use(errorMiddleware);

export default router;