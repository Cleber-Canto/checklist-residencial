import { Router } from 'express';
import * as architectController from '../controllers/architectController';

const router = Router();

router.post('/', architectController.createUser);
router.get('/:id', architectController.getUserById);
router.get('/', architectController.getAllUsers);

export default router