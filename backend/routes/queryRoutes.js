import express from 'express';
import { executeQuery, testConnection, getPackages } from '../controllers/queryController.js';

const router = express.Router();

router.post('/query', executeQuery);
router.get('/test', testConnection);
router.get('/packages', getPackages);

export default router;