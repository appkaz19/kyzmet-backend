import { Router } from 'express';
import * as locationController from './location.controller.js';

const router = Router();

// Fetch all regions with cities and translations
router.get('/regions', locationController.getAllRegions);

// Fetch cities by region ID
router.get('/regions/:regionId/cities', locationController.getCitiesByRegion);

export default router;
