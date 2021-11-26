import express from 'express';
import cors from 'cors';

import config from './config/config';
import logging from './config/logging';
import connectDB from './controllers/connectMongo';

import indexRoutes from './routes/index';

import dotenv from 'dotenv';
dotenv.config();

const NAMESPACE = 'SERVER';

connectDB(process.env.MONGODB_STRING);

const app = express()
    .use(cors({ origin: process.env.CLIENT }))
    .use(express.json())
    .use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    logging.info(
        NAMESPACE,
        `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
    );

    next();
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.CLIENT);
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    next();
});

// Routes
app.use('/', indexRoutes);

// Not found
app.use((req, res) => {
    const error = new Error('Route not found');

    return res.status(404).json({
        error: error.message,
    });
});

app.listen(config.server.port, () => {
    logging.info(NAMESPACE, `Server running at port ${config.server.port}`);
});
