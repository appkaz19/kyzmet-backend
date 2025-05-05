import { Router } from 'express';
import * as locationController from './location.controller.js';

const router = Router();

router.get('/', locationController.getAll);

export default router;
