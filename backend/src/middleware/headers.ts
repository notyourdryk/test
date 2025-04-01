import { NextFunction, Request, Response } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    next();
}
