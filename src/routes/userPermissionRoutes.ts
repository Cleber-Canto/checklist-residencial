import { Router } from 'express';
import * as userPermissionController from '../controllers/userPermissionController';

const router = Router();

router.post('/assign', userPermissionController.assignPermission);
router.get('/:userId', userPermissionController.getUserPermissions);

export default router;
