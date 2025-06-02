import jwt from 'jsonwebtoken';
import { config } from '../config/config.mjs';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token required' });

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

export const checkRole = ({ minLevel = 0, allowedRoles = [] } = {}) => {
    return (req, res, next) => {
        const { role, level } = req.user;

        if (allowedRoles.includes(role) || level <= minLevel) {
            return next();
        }

        return res.status(403).json({
            message: "you don't have permission to access this route",
        });
    };
};
