import { Request, Response, NextFunction } from "express";
import { LanguageEnum, RequirementError } from "../../../infrastructure";
import { sendError } from "../../../services";

export async function ModernMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const lang = req.headers["content-language"]
            ? req.headers["content-language"]
            : LanguageEnum.UZ;
        req.lang = lang;
        res.lang = lang;
        if (!req.headers["device-uid"]) {
            throw new RequirementError("DeviceUid");
        }
    } catch (err) {
        return sendError(err, req, res);
    }
    await next();
}
