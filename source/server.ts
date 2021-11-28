import express from 'express';
import cors from 'cors';

import config from './config/config';
import logging from './config/logging';
import connectDB from './controllers/mongodb';

import rateLimit from 'express-rate-limit';

import routes from './routes';
import notFound from './controllers/notFound';
import headers from './controllers/headers';
import logAction from './controllers/logAction';

import dotenv from 'dotenv';
dotenv.config();

const NAMESPACE = process.env.SERVER_NAMESPACE || 'SERVER';

connectDB(process.env.MONGODB_STRING);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    handler: (req, res) => {
        return res.status(429).json({
            error: 'Sent too many requests. Try again later.',
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

app.listen(config.server.port, () => {
    logging.info(NAMESPACE, `Server running at port ${config.server.port}`);
});
