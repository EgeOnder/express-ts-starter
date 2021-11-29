import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import routes from './routes';
import notFound from './controllers/notFound';
import headers from './controllers/headers';
import logAction from './controllers/logAction';

import config from './config/config';

const limiter = rateLimit({
    windowMs: config.limiter.window, // 15 minutes
    max: config.limiter.max,
    handler: (req, res) => {
        return res.status(429).json({
            error: config.limiter.message,
        });
    },
});

const app = express()
    .use(cors({ origin: process.env.CLIENT }))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(logAction)
    .use(headers)
    .use(limiter)
    .use(routes)
    .use(notFound);

export default app;
