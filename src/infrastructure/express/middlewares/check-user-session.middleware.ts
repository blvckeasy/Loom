import express from "express";
import { TokenNotProvidedError } from "../../errors";
import { sendError } from "../../../services";
import { checkUserSessionCase } from "../../../domains";
import { CustomExpressRequest, CustomExpressResponse } from "../../shared";

export async function CheckUserSessionMiddleware(
    req: CustomExpressRequest,
    res: CustomExpressResponse,
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

