import * as UserModel from '../models/auth/userModel.mjs';
import { hashPassword } from './authService.mjs';
import { validateUser, validatePartialUser } from '../schemas/user.mjs';

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

    const users = await UserModel.getUsers(parsedLimit, offset);
    const total = parseInt(await UserModel.countUsers());
    const totalPages = Math.ceil(total / parsedLimit);

    // Remove the superadmins of the user array
    const usersFiltered = users.filter(
        (user) => !(user.roleId === 1 || user.roleId === '1')
    );

    return {
        parsedPage,
        parsedLimit,
        total,
        totalPages,
        usersFiltered,
    };
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    // If validations fails throws an error with details
    await validatePartialUser({ id });
    const user = await UserModel.getUserById(id);

    if (!user) {
        res.status(404);
        throw new Error('User not found.');
    }

    return user;
};

export const getUserByUsername = async (req, res) => {
    const { username } = req.params;

    // If validations fails throws an error with details
    await validatePartialUser({ username });

    const user = await UserModel.getUserByUsername(username.trim());

    if (!user) {
        res.status(404);
        throw new Error('User not found.');
    }

    return user;
};

export const getUserByEmail = async (req, res) => {
    const { email } = req.params;

    // If validations fails throws an error with details
    await validatePartialUser({ email });

    const user = await UserModel.getUserByEmail(email);

    if (!user) {
        res.status(404);
        throw new Error('User not found.');
    }

    return user;
};

// UPDATE
export const updateUserById = async (req, res) => {
    const { id } = req.params;

    const reqData = req.body;

    const hashedPassword = hashPassword(reqData.password);

    // Creating a DTO to match property names to user schema properties
    const userDTO = {
        id: id,
        fullname: reqData.fullname,
        email: reqData.email,
        username: reqData.username,
        password: hashedPassword,
        roleId: reqData.roleId,
    };

    // If validations fails throws an error with details
    await validateUser(userDTO);

    const user = await UserModel.getUserById(id);

    if (!user) {
        res.status(404);
        throw new Error('User not found.');
    }

    return await UserModel.updateUserById({
        id: userDTO.id,
        newFullname: userDTO.fullname,
        newEmail: userDTO.email,
        newUsername: userDTO.username,
        newHashedPassword: userDTO.hashedPassword,
        newRoleId: userDTO.roleId,
    });
};

export const updateUserByUsername = async (req, res) => {
    const { username: userUsername } = req.params;

    const reqData = req.body;
    const hashedPassword = hashPassword(reqData.password);

    // If validations fails throws an error with details
    await validatePartialUser({ username: userUsername });

    // Creating a DTO to match property names to user schema properties
    const userDTO = {
        // Random int to fill the required property
        id: id || 999,
        fullname: reqData.fullname,
        email: reqData.email,
        username: reqData.username,
        password: hashedPassword,
        roleId: reqData.roleId,
    };

    // If validations fails throws an error with details
    await validateUser(userDTO);

    const user = await UserModel.getUserByUsername(username.trim());

    if (!user) {
        res.status(404);
        throw new Error('User not found.');
    }

    return await UserModel.updateUserByUsername({
        username: userUsername,
        newFullname: userDTO.fullname,
        newEmail: userDTO.email,
        newUsername: userDTO.username,
        newHashedPassword: hashedPassword,
        newRoleId: userDTO.roleId,
    });
};

export const updateUserByEmail = async (req, res) => {
    const { email: userEmail } = req.params;

    const reqData = req.body;

    // If validations fails throws an error with details
    await validatePartialUser({ email: userEmail });

    const hashedPassword = hashPassword(password);

    // Creating a DTO to match property names to user schema properties
    const userDTO = {
        // Random int to fill the required property
        id: id || 999,
        fullname: reqData.fullname,
        email: reqData.email,
        username: reqData.username,
        password: hashedPassword,
        roleId: reqData.roleId,
    };

    // If validations fails throws an error with details
    await validateUser(userDTO);

    const user = await UserModel.getUserByEmail(email);

    if (!user) {
        res.status(404);
        throw new Error('User not found.');
    }

    return await UserModel.updateUserByEmail({
        email: userEmail,
        newFullname: userDTO.fullname,
        newEmail: userDTO.email,
        newUsername: userDTO.username,
        newHashedPassword: userDTO.password,
        newRoleId: userDTO.roleId,
    });
};

// PATCH
export const patchUserbyId = async (req, res) => {
    const { id } = req.params;

    await validatePartialUser({ id });

    const patchData = req.body;

    if (patchData.password) {
        patchData.password = hashPassword(patchData.password);
    }

    await validatePartialUser(patchData);

    const user = await UserModel.getUserById(id);
    if (!user) {
        res.status(404);
        throw new Error('User not found.');
    }

    const updatedUser = {
        ...user,
        ...patchData,
    };

    return await UserModel.updateUserById({
        id,
        newFullname: updatedUser.fullname,
        newEmail: updatedUser.email,
        newUsername: updatedUser.username,
        newHashedPassword: updatedUser.password,
        newRoleId: updatedUser.roleId,
    });
};

export const patchUserbyUsername = async (req, res) => {
    const { username } = req.params;

    await validatePartialUser({ username });

    const patchData = req.body;

    if (patchData.password) {
        patchData.password = hashPassword(patchData.password);
    }

    await validatePartialUser(patchData);

    const user = await UserModel.getUserByUsername(username);
    if (!user) {
        res.status(404);
        throw new Error('User not found.');
    }

    const updatedUser = {
        ...user,
        ...patchData,
    };

    return await UserModel.updateUserByUsername({
        username,
        newFullname: updatedUser.fullname,
        newEmail: updatedUser.email,
        newUsername: updatedUser.username,
        newHashedPassword: updatedUser.password,
        newRoleId: updatedUser.roleId,
    });
};

export const patchUserbyEmail = async (req, res) => {
    const { email } = req.params;

    await validatePartialUser({ email });

    const patchData = req.body;

    if (patchData.password) {
        patchData.password = hashPassword(patchData.password);
    }

    await validatePartialUser(patchData);

    const user = await UserModel.getUserByEmail(email);
    if (!user) {
        res.status(404);
        throw new Error('User not found.');
    }

    const updatedUser = {
        ...user,
        ...patchData,
    };

    return await UserModel.updateUserByUsername({
        email,
        newFullname: updatedUser.fullname,
        newEmail: updatedUser.email,
        newUsername: updatedUser.username,
        newHashedPassword: updatedUser.password,
        newRoleId: updatedUser.roleId,
    });
};

// DELETE
export const deleteUserById = async (req, res) => {
    const { id } = req.params;

    // If validations fails throws an error with details
    await validatePartialUser({ id });

    const user = await UserModel.getUserById(id);

    if (!user) {
        res.status(404);
        throw new Error('User not found.');
    }

    await UserModel.deleteUserById(id);
    return user;
};

export const deleteUserByUsername = async (req, res) => {
    const { username } = req.params;

    // If validations fails throws an error with details
    await validatePartialUser({ username });

    const user = await UserModel.getUserByUsername(username.trim());

    if (!user) {
        res.status(404);
        throw new Error('User not found.');
    }

    await UserModel.deleteUserByUsername(username.trim());
    return user;
};

export const deleteUserByEmail = async (req, res) => {
    const { email } = req.params;

    // If validations fails throws an error with details
    await validatePartialUser({ email });

    const user = await UserModel.getUserByEmail(email);

    if (!user) {
        res.status(404);
        throw new Error('User not found.');
    }

    await UserModel.deleteUserByEmail(email);

    return user;
};
