import express from "express";
import { TokenNotProvidedError } from "../../errors";
import { sendError } from "../../../services";
import { checkUserSessionCase } from "../../../domains";

export async function CheckUserSessionMiddleware(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> {
    try {
        if (!(req.headers && req.headers.authorization)) {
            throw new TokenNotProvidedError();
        }
    
        const accessToken = req.headers.authorization.split(" ")[1];
        const checkCase = await checkUserSessionCase.execute({ accessToken });

        req.user = checkCase.user;
    } catch (error) {
        return sendError(error, req, res);    
    }

    await next();
}

