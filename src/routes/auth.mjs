import express from 'express';
import { verifyToken, checkRole } from '../middlewares/auth.mjs';
import * as AuthController from '../controllers/auth.mjs';

const router = express.Router();

router.post(
    '/register',
    verifyToken,
    checkRole({ minLevel: 5, allowedRoles: ['admin', 'superadmin'] }),
    AuthController.register
);
router.post('/login', AuthController.login);

export default router;
