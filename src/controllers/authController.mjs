import { config } from '../config/config.mjs';
import * as AuthService from '../services/authService.mjs';
import 'cookie-parser';

const missingFieldsMessage = 'Missing required fields.';

export const register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: missingFieldsMessage });
    }

    try {
        await AuthService.registerUser(req, res);
        return res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: missingFieldsMessage });
    }

    try {
        await AuthService.loginUser(req, res);
        return res.status(200).json({ message: 'Logged in successfully.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        await AuthService.logout(req, res);
        return res
            .status(302)
            .redirect(config.homeURL)
            .json({ message: 'Logged out successfully.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
