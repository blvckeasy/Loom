import { NextFunction } from "express";
import { CustomExpressRequest, CustomExpressResponse, LanguageEnum } from "../../../infrastructure";
import { sendError } from "../../../services";

export async function ModernMiddleware(
    req: CustomExpressRequest,
    res: CustomExpressResponse,
    next: NextFunction
): Promise<void> {
    try {
        const lang = req.headers["content-language"]
            ? req.headers["content-language"]
            : LanguageEnum.UZ;
        req.lang = lang;
        res.lang = lang;
    } catch (err) {
        return sendError(err, req, res);
    }
    await next();
}
