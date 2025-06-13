import express from 'express';
import { verifyToken, checkRole } from '../middlewares/auth.mjs';
import * as AuthController from '../controllers/authController.mjs';

export const router = express.Router();

router.post(
    '/register',
    verifyToken,
    checkRole({ minLevel: 5, allowedRoles: ['admin', 'superadmin'] }),
    AuthController.register
);

router.post('/login', AuthController.login);

router.post('/logout', AuthController.logout);
