import * as RoleModel from '../models/auth/roleModel.mjs';
import { validateRole, validatePartialRole } from '../schemas/role.mjs';

// ---- GET
export const getRoles = async (req, res) => {
    return await RoleModel.getRoles();
};

export const getRoleById = async (req, res) => {
    const { id } = req.params;
    await validatePartialRole({ id });

    const role = await RoleModel.getRoleById(id);

    if (!role) {
        res.status(404);
        throw new Error('Role not found.');
    }

    return role;
};

export const getRoleByName = async (req, res) => {
    const { name } = req.params;
    await validatePartialRole({ name });

    const role = await RoleModel.getRoleByName(name);

    if (!role) {
        res.status(404);
        throw new Error('Role not found.');
    }

    return role;
};

// ---- POST/CREATE
export const createRole = async (req, res) => {
    const reqData = req.body;

    const roleDTO = {
        // random value to validate the entire schema
        id: 999,
        name: reqData.name,
        description: reqData.description,
        level: reqData.level,
    };

    await validateRole(roleDTO);

    const role = await RoleModel.getRoleByName(roleDTO.name);
    if (role) throw new Error('This role already exists.');

    return await RoleModel.createRole({
        name: roleDTO.name,
        description: roleDTO.description,
        level: roleDTO.level,
    });
};

// ---- PUT/UPDATE
export const updateRoleById = async (req, res) => {
    const { id } = req.params;

    await validatePartialRole({ id });

    const reqData = req.body;

    const roleDTO = {
        id: id,
        name: reqData.name,
        description: reqData.description,
        level: reqData.level,
    };

    await validateRole(roleDTO);

    const role = await RoleModel.getRoleById(id);
    if (!role) {
        res.status(404);
        throw new Error('Role not found.');
    }

    return await RoleModel.updateRoleById({
        id: id,
        newName: roleDTO.name,
        newDescription: roleDTO.description,
        newLevel: roleDTO.level,
    });
};

export const updateRoleByName = async (req, res) => {
    const { name } = req.params;

    await validatePartialRole({ name });

    const reqData = req.body;
    const roleDTO = {
        id: 999,
        name: reqData.name,
        description: reqData.description,
        level: reqData.level,
    };

    await validateRole(roleDTO);

    const role = await RoleModel.getRoleByName(name);
    if (!role) {
        res.status(404);
        throw new Error('Role not found.');
    }

    return await RoleModel.updateRoleByName({
        name: name,
        newName: roleDTO.name,
        newDescription: roleDTO.description,
        newLevel: roleDTO.level,
    });
};

// ---- PATCH
export const patchRoleById = async (req, res) => {
    const { id } = req.params;

    await validatePartialRole({ id });

    const reqData = req.body;
    await validatePartialRole({ reqData });

    const role = await RoleModel.getRoleById(id);
    if (!role) {
        res.status(404);
        throw new Error('Role not found.');
    }

    const updatedRole = {
        ...role,
        ...reqData,
    };

    return await RoleModel.updateRoleById({
        id: id,
        newName: updatedRole.name,
        newDescription: updatedRole.description,
        newLevel: updatedRole.level,
    });
};

export const patchRoleByName = async (req, res) => {
    const { name } = req.params;

    await validatePartialRole({ name });

    const reqData = req.body;
    await validatePartialRole({ reqData });

    const role = await RoleModel.getRoleByName(name);
    if (!role) {
        res.status(404);
        throw new Error('Role not found.');
    }

    const updatedRole = {
        ...role,
        ...reqData,
    };

    return await RoleModel.updateRoleByName({
        name: name,
        newName: updatedRole.name,
        newDescription: updatedRole.description,
        newLevel: updatedRole.level,
    });
};

// ---- DELETE
export const deleteRoleById = async (req, res) => {
    const { id } = req.params;
    await validatePartialRole({ id });

    const role = await RoleModel.getRoleById(id);
    if (!role) {
        res.status(404);
        throw new Error('Role not found.');
    }

    await RoleModel.deleteRoleById(id);
    return role;
};

export const deleteRoleByName = async (req, res) => {
    const { name } = req.params;
    await validatePartialRole({ name });

    const role = await RoleModel.getRoleByName(name);
    if (!role) {
        res.status(404);
        throw new Error('Role not found.');
    }

    await RoleModel.deleteRoleByName(name);
    return role;
};
