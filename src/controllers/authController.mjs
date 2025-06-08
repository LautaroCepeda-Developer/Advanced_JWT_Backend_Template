import * as AuthService from '../services/authService.mjs';

const missingFieldsMessage = 'Missing required fields';

export const register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res
            .status(res.statusCode || 400)
            .json({ message: missingFieldsMessage });
    }

    try {
        await AuthService.registerUser(req, res);
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        return res
            .status(res.statusCode || 400)
            .json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res
            .status(res.statusCode || 400)
            .json({ message: missingFieldsMessage });
    }

    try {
        const token = await AuthService.loginUser(req, res);
        return res.status(res.statusCode || 400).json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
