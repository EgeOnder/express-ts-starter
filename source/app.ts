import express from 'express';
import cors from 'cors';

import routes from './routes';
import notFound from './controllers/notFound';
import headers from './controllers/headers';
import logAction from './controllers/logAction';

const app = express()
    .use(cors({ origin: process.env.CLIENT }))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(logAction)
    .use(headers)
    .use(routes)
    .use(notFound);

export default app;
