import { Router } from 'express';
import * as clientController from '../controllers/clientController';

const router = Router();

router.post('/', clientController.createUser);
router.get('/:id', clientController.getUserById);
router.get('/', clientController.getAllUsers);

export default router;
