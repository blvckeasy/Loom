import { Request, Response, NextFunction } from 'express';

export async function GetProxyController (req: Request, res: Response, next: NextFunction): Promise<void> {
    res.send("get-proxy-controller");

    return;
}