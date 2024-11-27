import { Router } from 'express';
import * as checklistController from '../controllers/checklistController';

const router = Router();

router.post('/', checklistController.createChecklist);
router.get('/', checklistController.getAllChecklists);

export default router;
