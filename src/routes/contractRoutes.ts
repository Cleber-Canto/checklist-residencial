import { Router } from 'express';
import * as contractController from '../controllers/contractController';

const router = Router();

router.post('/', contractController.createContract);
router.get('/', contractController.getAllContracts);

export default router;
