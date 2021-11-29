import { Response, NextFunction, Request } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
// import { UserRequest } from '../utils/userRequest';

import logging from 'source/config/logging';
import config from '../config/config';

declare module 'express-serve-static-core' {
    interface Request {
        user: string | JwtPayload;
    }
}

const NAMESPACE = 'CHECKAUTH';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token =
        req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) return res.json({ error: 'Not authenticated!' });

    try {
        const decoded = jwt.verify(token, config.auth.jwtKey);
        req.user = decoded;
    } catch (error) {
        logging.error(NAMESPACE, error.message);
        return res.json({ error });
    }

    return next();
};

export default verifyToken;
