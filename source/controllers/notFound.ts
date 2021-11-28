import { Request, Response } from 'express';

const notFound = (req: Request, res: Response) => {
    const error = new Error('Route not found');

    return res.status(404).json({
        error: error.message,
    });
};

export default notFound;
