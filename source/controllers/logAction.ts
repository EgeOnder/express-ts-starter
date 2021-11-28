import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';

import dotenv from 'dotenv';
dotenv.config();

const logAction = (req: Request, res: Response, next: NextFunction) => {
    logging.info(
        process.env.SERVER_NAMESPACE || 'SERVER',
        `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
    );

    next();
};

export default logAction;
