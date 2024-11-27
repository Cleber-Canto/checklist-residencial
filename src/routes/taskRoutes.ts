import { Router } from 'express';
import * as taskController from '../controllers/taskController';

const router = Router();

router.post('/', taskController.add);
router.get('/:checklistId', taskController.getByChecklist);

export default router;
