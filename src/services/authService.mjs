import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.mjs';
import { createUser, getUserByUsername } from '../models/auth/userModel.mjs';
import { isEmailValid, isNameValid } from '../tools/commonValidations.mjs';
import { validatePartialUser, validateUser } from '../schemas/user.mjs';
import { getRoleByName } from '../models/auth/roleModel.mjs';
import 'cookie-parser';

export const hashPassword = (password) => {
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

const cookieExpiration = (role) => {
    return tokenExpiration(role) * 1000;
};

// Generate a JWT Token
const signToken = (payload) => {
    // Set the fields to be included in the token
    const fields = {
        username: payload.username,
        role: payload.role_name,
        level: payload.role_level,
    };

    // Sign the token
    return jwt.sign(fields, config.jwtSecret, {
        expiresIn: tokenExpiration(fields.role),
    });
};

export const registerUser = async (req, res) => {
    await validatePartialUser({
        username: req.body.username,
        email: req.body.email,
    });

    const existingUser = await getUserByUsername(req.body.username);
    const existingEmail = await getUserByEmail(req.body.email);

    if (existingUser) {
        throw new Error('Username already exists');
    }

    if (existingEmail) {
        throw new Error('Email already exists');
    }

    const { fullname, email, username, password, role } = req.body;

    const roleResponse = await getRoleByName(role);

    if (!roleResponse) {
        throw new Error('Role not found.');
    }

    const roleId = roleResponse.id;
    const roleLevel = roleResponse.level;

    if (
        (role === 'superadmin' || role === 'admin') &&
        req.user.role_name !== 'superadmin'
    ) {
        throw new Error(
            'Only superadmins can create other admins and superadmins.'
        );
    }

    if (
        roleLevel >= req.user.role_level &&
        (req.user.role_level !== 1 || req.user.role_level !== '1')
    ) {
        throw new Error(
            "Users cannot be created with roles that have higher access than the current user's role."
        );
    }

    const hashedPassword = await hashPassword(password);

    await validateUser({
        // Random id to validate the entire schema
        id: 999,
        fullname: fullname,
        email: email,
        username: username,
        password: hashedPassword,
        roleId: roleId,
    });

    createUser({ fullname, email, username, hashedPassword, roleId });
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

    const decoded = jwt.verify(token, config.jwtSecret);

    res.cookie('authCookie', token, {
        maxAge: cookieExpiration(decoded.role),
        signed: true,
        httpOnly: true,
    });
};

export const logout = async (req, res) => {
    res.clearCookie('authCookie', {
        signed: true,
        httpOnly: true,
    });
};
