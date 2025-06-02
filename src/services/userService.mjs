import * as UserModel from '../models/auth/userModel.mjs';
import { isEmailValid, isUsernameValid } from '../tools/commonValidations.mjs';

// GET
export const getUsersWithPagination = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    const parsedPage = parseInt(page);
    const parsedLimit = parseInt(limit);

    // Check if the page and the limit received are integers
    if (Number.isNaN(parsedPage) || Number.isNaN(parsedLimit)) {
        throw new Error(
            "The value of 'page' and 'limit' can only be a integer"
        );
    }

    if (parsedPage < 1) {
        throw new Error('The page must be greather than 0');
    }

    if (parsedLimit < 5) {
        throw new Error('The limit must be greater than or equal to 5');
    }

    const offset = (parsedPage - 1) * parsedLimit;

    const users = await UserModel.getUsers(offset, parsedLimit);
    const total = parseInt(await UserModel.countUsers());
    const totalPages = Math.ceil(total / parsedLimit);

    return {
        parsedPage,
        parsedLimit,
        total,
        totalPages,
        users,
    };
};

export const getUserById = async (req, res) => {
    const { id } = req.query;

    const parsedId = parseInt(id);

    if (Number.isNaN(parsedId)) {
        throw new Error("The value of 'id' can only be a integer");
    }

    return await UserModel.getUserById(parsedId);
};

export const getUserByUsername = async (req, res) => {
    const { username } = req.query;
    const trimmedUser = username.trim();

    if (!isUsernameValid(trimmedUser)) {
        throw new Error("The 'username' contains invalid characters");
    }

    return await UserModel.getUserByUsername(trimmedUser);
};

export const getUserByEmail = async (req, res) => {
    const { email } = req.query;

    if (!isEmailValid(email)) {
        throw new Error('The email is invalid');
    }

    return await UserModel.getUserByEmail(email);
};

// UPDATE
export const updateUserById = async (req, res) => {
    const {
        id,
        newFullname,
        newEmail,
        newUsername,
        newHashedPassword,
        newRoleId,
    } = req.body;

    if (
        !id ||
        !newFullname ||
        !newEmail ||
        !newUsername ||
        !newHashedPassword ||
        newRoleId
    ) {
        throw new Error('All fields are required');
    }

    const parsedId = parseInt(id);

    if (Number.isNaN(parsedId)) {
        throw new Error("The value of 'id' can only be an integer");
    }

    if (parsedId < 1) {
        throw new Error("The value of 'id' is invalid");
    }

    const parsedNewRoleId = parseInt(newRoleId);

    if (Number.isNaN(parsedNewRoleId)) {
        throw new Error("The value of 'newRoleId' can only be an integer");
    }

    if (parsedNewRoleId < 1) {
        throw new Error("The value of 'newRoleId' is invalid");
    }

    const user = await UserModel.getUserById(id);

    if (!user) {
        throw new Error('User not found.');
    }

    return await UserModel.updateUserById({
        id,
        newFullname,
        newEmail,
        newUsername,
        newHashedPassword,
        newRoleId,
    });
};

// DELETE
export const deleteUserById = async (req, res) => {
    const { id } = req.query;

    const parsedId = parseInt(id);

    if (Number.isNaN(parsedId)) {
        throw new Error("The value of 'id' can only be a integer");
    }

    await UserModel.deleteUserById(parsedId);
};

export const deleteUserByUsername = async (req, res) => {
    const { username } = req.query;

    const trimmedUser = username.trim();

    if (!isUsernameValid(trimmedUser)) {
        throw new Error("The 'username' contains invalid characters");
    }

    await UserModel.deleteUserByUsername(trimmedUser);
};

export const deleteUserByEmail = async (req, res) => {
    const { email } = req.query;

    if (!isEmailValid(email)) {
        throw new Error('The email is invalid');
    }

    await UserModel.deleteUserByEmail(email);
};
