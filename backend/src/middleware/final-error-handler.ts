import { NextFunction, Request, Response } from 'express';

export default function finalErrorHandler (error: Error, req: Request, res: Response, next: NextFunction) {
    console.log('Error: ', error.message);

    res.status(500).send('Internal Server Error');
}