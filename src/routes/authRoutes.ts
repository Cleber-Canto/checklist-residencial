import express from 'express';
import { createUser, loginUser, getLoggedInUser } from '../controllers/AuthController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/me', authMiddleware, getLoggedInUser);

export default router;
