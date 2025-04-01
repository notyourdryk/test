import { NextFunction, Request, Response } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    console.debug(req.method, req.url);
    next();
}
