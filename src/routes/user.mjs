import express from 'express';
import { verifyToken, checkRole } from '../middlewares/auth.mjs';
import * as UserController from '../controllers/userController.mjs';

export const router = express.Router();

// ---- GET
router.get(
    '/users',
    verifyToken,
    checkRole({ minLevel: 5, allowedRoles: ['admin', 'superadmin'] }),
    UserController.getUsers
);

router.get(
    '/users/:id',
    verifyToken,
    checkRole({ minLevel: 5, allowedRoles: ['admin', 'superadmin'] }),
    UserController.getUserById
);

router.get(
    '/users/username/:username',
    verifyToken,
    checkRole({ minLevel: 5, allowedRoles: ['admin', 'superadmin'] }),
    UserController.getUserByUsername
);

router.get(
    '/users/email/:email',
    verifyToken,
    checkRole({ minLevel: 5, allowedRoles: ['admin', 'superadmin'] }),
    UserController.getUserByEmail
);

// ---- PUT
router.put(
    '/users/:id',
    verifyToken,
    checkRole({ minLevel: 5, allowedRoles: ['admin', 'superadmin'] }),
    UserController.updateUserById
);

router.put(
    '/users/username/:username',
    verifyToken,
    checkRole({ minLevel: 5, allowedRoles: ['admin', 'superadmin'] }),
    UserController.updateUserByUsername
);

router.put(
    '/users/email/:email',
    verifyToken,
    checkRole({ minLevel: 5, allowedRoles: ['admin', 'superadmin'] }),
    UserController.updateUserByEmail
);

// ---- PATCH
router.patch(
    '/users/:id',
    verifyToken,
    checkRole({ minLevel: 5, allowedRoles: ['admin', 'superadmin'] }),
    UserController.patchUserById
);

router.patch(
    '/users/username/:username',
    verifyToken,
    checkRole({ minLevel: 5, allowedRoles: ['admin', 'superadmin'] }),
    UserController.patchUserByUsername
);

router.patch(
    '/users/email/:email',
    verifyToken,
    checkRole({ minLevel: 5, allowedRoles: ['admin', 'superadmin'] }),
    UserController.patchUserByEmail
);

// ---- DELETE
router.delete(
    '/users/:id',
    verifyToken,
    checkRole({ minLevel: 5, allowedRoles: ['admin', 'superadmin'] }),
    UserController.deleteUserById
);

router.delete(
    '/users/username/:username',
    verifyToken,
    checkRole({ minLevel: 5, allowedRoles: ['admin', 'superadmin'] }),
    UserController.deleteUserByUsername
);

router.delete(
    '/users/email/:email',
    verifyToken,
    checkRole({ minLevel: 5, allowedRoles: ['admin', 'superadmin'] }),
    UserController.deleteUserByEmail
);
