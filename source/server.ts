import config from './config/config';
import logging from './config/logging';
import connectDB from './utils/mongodb';

import app from './app';

import dotenv from 'dotenv';
dotenv.config();

const NAMESPACE = process.env.SERVER_NAMESPACE || 'SERVER';

connectDB(process.env.MONGODB_STRING);

app.listen(config.server.port, () => {
    logging.info(NAMESPACE, `Server running at port ${config.server.port}`);
});
