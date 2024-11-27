import { Router } from 'express';
import * as specialtyController from '../controllers/specialtyController';

const router = Router();

router.post('/', specialtyController.createSpecialty);
router.get('/', specialtyController.getAllSpecialties);

export default router;
