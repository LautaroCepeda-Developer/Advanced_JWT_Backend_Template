import express from 'express';
import cors from 'cors';
import { config } from './config/config.mjs';
import * as AuthRoutes from './routes/auth.mjs';
import * as UserRouter from './routes/user.mjs';
import * as RoleRouter from './routes/role.mjs';
import { hashPassword } from './services/authService.mjs';
import cookieParser from 'cookie-parser';

// Initialize the express app
const app = express();

// Delete the X-Powered-By header
app.disable('x-powered-by');

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.use(cookieParser(config.cookieSecret));

// Authentication routes
app.use('/auth', AuthRoutes.router);

app.use('/people', UserRouter.router);

app.use('/people', RoleRouter.router);

// Middleware to handle 404 errors
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Not found',
    });
});

// Shows where the server is listening
app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
});
