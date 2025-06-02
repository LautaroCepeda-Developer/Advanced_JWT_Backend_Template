import express from 'express';
import cors from 'cors';
import { config } from './config/config.mjs';
import { authRoutes } from './routes/auth.mjs';

// Initialize the express app
const app = express();

// Delete the X-Powered-By header
app.disable('x-powered-by');

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Authentication routes
app.use('/auth', authRoutes);

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
