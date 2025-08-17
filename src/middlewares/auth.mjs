import jwt from 'jsonwebtoken';
import { config } from '../config/config.mjs';
import { signedCookie } from 'cookie-parser';
import { logout } from '../services/authService.mjs';

export const verifyToken = (req, res, next) => {
    const cookie = req.signedCookies['authCookie'];
    const cookieVal = signedCookie(cookie, config.cookieSecret);

    if (!cookie) {
        return res.status(401).json({
            message: 'Missing required cookies.',
        });
    }

    if (cookieVal === false) {
        logout(req, res);

        return res.status(403).json({
            message: 'Invalid or expired cookie.',
        });
    }

    try {
        const decoded = jwt.verify(cookieVal, config.jwtSecret);
        req.user = decoded;
        next();
    } catch (err) {
        logout(req, res);
        return res.status(403).json({
            message: 'Invalid or expired token.',
        });
    }
};

export const checkRole = ({ minLevel = 0, allowedRoles = [] } = {}) => {
    return (req, res, next) => {
        const { role, level } = req.user;

        if (allowedRoles.includes(role) || level <= minLevel) {
            return next();
        }

        return res.status(403).json({
            message: 'Insufficient permissions to access this route',
        });
    };
};
