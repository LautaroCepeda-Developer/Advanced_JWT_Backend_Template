import * as UserService from '../services/userService.mjs';

export const getUsers = async (req, res) => {
    try {
        const response = await UserService.getUsersWithPagination(req, res);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
