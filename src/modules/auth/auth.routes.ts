import { Router } from 'express';
import { AuthController } from './auth.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/refresh', AuthController.refreshToken);
router.get('/me', authenticate, AuthController.me);

export default router;
