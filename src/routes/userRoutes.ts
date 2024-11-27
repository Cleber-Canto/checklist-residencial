import { Router } from 'express';
import { registerClientController, registerArchitectController, registerAdminController, loginController } from '../controllers/userController';

const router = Router();

router.post('/registerClient', registerClientController);
router.post('/registerArchitect', registerArchitectController);
router.post('/registerAdmin', registerAdminController);
router.post('/login', loginController);

export default router;
