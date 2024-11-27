import { Router } from 'express';
import * as permissionController from '../controllers/permissionController';

const router = Router();

router.post('/', permissionController.createPermission);
router.get('/', permissionController.getAllPermissions);

export default router;
