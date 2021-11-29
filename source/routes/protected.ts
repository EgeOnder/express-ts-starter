import { Router, Response, Request } from 'express';

import checkAuth from '../controllers/checkAuth';

const router = Router();

const PATH = '/protected/';

router.get(PATH, checkAuth, (req: Request, res: Response) => {
    res.json({ message: 'Authenticated!' });
});

export default router;
