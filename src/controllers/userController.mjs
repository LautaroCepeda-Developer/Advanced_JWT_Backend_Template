import * as UserService from '../services/userService.mjs';

// GET
export const getUsers = async (req, res) => {
    try {
        const response = await UserService.getUsersWithPagination(req, res);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const response = await UserService.getUserById(req, res);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

export const getUserByUsername = async (req, res) => {
    try {
        const response = await UserService.getUserByUsername(req, res);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

export const getUserByEmail = async (req, res) => {
    try {
        const response = await UserService.getUserByEmail(req, res);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

// PUT
export const updateUserById = async (req, res) => {
    try {
        const response = await UserService.updateUserById(req, res);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

export const updateUserByUsername = async (req, res) => {
    try {
        const response = await UserService.updateUserByUsername(req, res);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

export const updateUserByEmail = async (req, res) => {
    try {
        const response = await UserService.updateUserByEmail(req, res);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

// PATCH
export const patchUserById = async (req, res) => {
    try {
        const response = await UserService.patchUserbyId(req, res);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

export const patchUserByUsername = async (req, res) => {
    try {
        const response = await UserService.patchUserbyUsername(req, res);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

export const patchUserByEmail = async (req, res) => {
    try {
        const response = await UserService.patchUserbyEmail(req, res);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

// DELETE
export const deleteUserById = async (req, res) => {
    try {
        const response = await UserService.deleteUserById(req, res);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

export const deleteUserByUsername = async (req, res) => {
    try {
        const response = await UserService.deleteUserByUsername(req, res);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

export const deleteUserByEmail = async (req, res) => {
    try {
        const response = await UserService.deleteUserByEmail(req, res);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
