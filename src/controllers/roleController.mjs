import * as RoleService from '../services/roleService.mjs';

// ---- GET
export const getRoles = async (req, res) => {
    try {
        const response = await RoleService.getRoles(req, res);
        return res.status(200).json(response);
    } catch (error) {
        return res
            .status(res.statusCode || 400)
            .json({ message: error.message });
    }
};

export const getRoleById = async (req, res) => {
    try {
        const response = await RoleService.getRoleById(req, res);
        return res.status(200).json(response);
    } catch (error) {
        return res
            .status(res.statusCode || 400)
            .json({ message: error.message });
    }
};

export const getRoleByName = async (req, res) => {
    try {
        const response = await RoleService.getRoleByName(req, res);
        return res.status(200).json(response);
    } catch (error) {
        return res
            .status(res.statusCode || 400)
            .json({ message: error.message });
    }
};

// ---- POST/CREATE
export const createRole = async (req, res) => {
    try {
        const response = await RoleService.createRole(req, res);
        return res.status(200).json(response);
    } catch (error) {
        return res
            .status(res.statusCode || 400)
            .json({ message: error.message });
    }
};

// ---- PUT/UPDATE
export const updateRoleById = async (req, res) => {
    try {
        const response = await RoleService.updateRoleById(req, res);
        return res.status(200).json(response);
    } catch (error) {
        return res
            .status(res.statusCode || 400)
            .json({ message: error.message });
    }
};

export const updateRoleByName = async (req, res) => {
    try {
        const response = await RoleService.updateRoleByName(req, res);
        return res.status(200).json(response);
    } catch (error) {
        return res
            .status(res.statusCode || 400)
            .json({ message: error.message });
    }
};

// ---- PATCH
export const patchRoleById = async (req, res) => {
    try {
        const response = await RoleService.patchRoleById(req, res);
        return res.status(200).json(response);
    } catch (error) {
        return res
            .status(res.statusCode || 400)
            .json({ message: error.message });
    }
};

export const patchRoleByName = async (req, res) => {
    try {
        const response = await RoleService.patchRoleByName(req, res);
        return res.status(200).json(response);
    } catch (error) {
        return res
            .status(res.statusCode || 400)
            .json({ message: error.message });
    }
};

// ---- DELETE
export const deleteRoleById = async (req, res) => {
    try {
        const response = await RoleService.deleteRoleById(req, res);
        return res.status(200).json(response);
    } catch (error) {
        return res
            .status(res.statusCode || 400)
            .json({ message: error.message });
    }
};

export const deleteRoleByName = async (req, res) => {
    try {
        const response = await RoleService.deleteRoleByName(req, res);
        return res.status(200).json(response);
    } catch (error) {
        return req
            .status(res.statusCode || 400)
            .json({ message: error.message });
    }
};
