import express from 'express';
import { verifyToken, checkRole } from '../middlewares/auth.mjs';
import * as RoleController from '../controllers/roleController.mjs';

const router = express.Router();

// ---- GET
router.get(
    '/roles',
    verifyToken,
    checkRole({ minLevel: 5, allowedRoles: ['admin', 'superadmin'] }),
    RoleController.getRoles
);

router.get(
    '/roles/:id',
    verifyToken,
    checkRole({ minLevel: 5, allowedRoles: ['admin', 'superadmin'] }),
    RoleController.getRoleById
);

router.get(
    '/roles/:name',
    verifyToken,
    checkRole({ minLevel: 5, allowedRoles: ['admin', 'superadmin'] }),
    RoleController.getRoleByName
);

// ---- POST
router.post(
    '/roles',
    verifyToken,
    checkRole({ minLevel: 5, allowedRoles: ['admin', 'superadmin'] }),
    RoleController.createRole
);

// ---- PUT
router.put(
    '/roles/:id',
    verifyToken,
    checkRole({ minLevel: 5, allowedRoles: ['admin', 'superadmin'] }),
    RoleController.updateRoleById
);

router.put(
    '/roles/:name',
    verifyToken,
    checkRole({ minLevel: 5, allowedRoles: ['admin', 'superadmin'] }),
    RoleController.updateRoleByName
);

// ---- PATCH
router.patch(
    '/roles/:id',
    verifyToken,
    checkRole({ minLevel: 5, allowedRoles: ['admin', 'superadmin'] }),
    RoleController.patchRoleById
);

router.patch(
    '/roles/:name',
    verifyToken,
    checkRole({ minLevel: 5, allowedRoles: ['admin', 'superadmin'] }),
    RoleController.patchRoleByName
);

// ---- DELETE
router.delete(
    '/roles/:id',
    verifyToken,
    checkRole({ minLevel: 5, allowedRoles: ['admin', 'superadmin'] }),
    RoleController.deleteRoleById
);

router.delete(
    '/roles/:name',
    verifyToken,
    checkRole({ minLevel: 5, allowedRoles: ['admin', 'superadmin'] }),
    RoleController.deleteRoleByName
);
