import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
    cookieSecret: process.env.COOKIE_SECRET,
    corsOrigin: process.env.CORS_ORIGIN,
};
