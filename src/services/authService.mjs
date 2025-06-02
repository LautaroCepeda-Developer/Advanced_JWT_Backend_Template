import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.mjs';
import { createUser, getUserByUsername } from '../models/auth/userModel.mjs';
import { isEmailValid, isUsernameValid } from '../tools/commonValidations.mjs';

const hashPassword = (password) => {
    return bcrypt.hash(password, 12);
};

// Token expiration time
const tokenExpiration = (role) => {
    // Formula: minutes * 60 = expiration in seconds
    switch (role) {
        case 'superadmin':
            return 15 * 60; // 15 minutes
        case 'admin':
            return 30 * 60; // 30 minutes
        default:
            return 60 * 60; // 1 hour
    }
};

// Generate a JWT Token
const signToken = (payload) => {
    // Set the fields to be included in the token
    const fields = {
        username: payload.username,
        role: payload.role,
        level: payload.level,
    };

    // Sign the token
    return jwt.sign(fields, config.jwtSecret, {
        expiresIn: tokenExpiration(fields.role),
    });
};

export const registerUser = async (req, res) => {
    if (!isUsernameValid) {
        throw new Error("The 'username' contains invalid characters");
    }

    if (!isEmailValid(req.body.email)) {
        throw new Error('Invalid email');
    }

    const existingUser = await getUserByUsername(req.body.username);
    const existingEmail = await getUserByEmail(req.body.email);

    if (existingUser) {
        throw new Error('Username already exists');
    }

    if (existingEmail) {
        throw new Error('Email already exists');
    }

    const { fullname, email, username, password, role, level } = req.body;

    const hashedPassword = await hashPassword(password);

    createUser({ fullname, email, username, hashedPassword, role, level });
};

export const loginUser = async (req, res) => {
    const user = await getUserByUsername(req.body.username);
    if (!user) {
        throw new Error('Invalid user or password');
    }

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
        throw new Error('Invalid user or password');
    }

    const token = signToken(user);

    return token;
};
