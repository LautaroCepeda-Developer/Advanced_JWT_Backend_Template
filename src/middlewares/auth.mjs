import jwt from 'jsonwebtoken';
import { config } from '../config/config.mjs';
import { signedCookie } from 'cookie-parser';

export const verifyToken = (req, res, next) => {
    const cookie = req.signedCookies['authCookie'];
    const cookieVal = signedCookie(cookie, config.cookieSecret);

    if (!cookie) {
        return res
            .status(403)
            .redirect(config.homeURL)
            .json({ message: 'Missing required cookies.' });
    }

    if (cookieVal === false) {
        return res
            .status(403)
            .redirect(config.homeURL)
            .json({ message: 'Invalid or expired cookie.' });
    }

    try {
        const decoded = jwt.verify(cookieVal, config.jwtSecret);
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (err) {
        return res
            .status(403)
            .redirect(config.homeURL)
            .json({ message: 'Invalid or expired token.' });
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
