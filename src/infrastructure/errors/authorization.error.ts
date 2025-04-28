import { ErrorCodeEnum } from "../enums";
import { BaseError } from "./base.error";

export class AuthorizationError extends BaseError {
    constructor(message: string) {
        super(
            message,
            {
                en: `Authorization error`,
                ru: `Ошибка авторизации`,
                uz: `Avtorizatsiya xatosi`,
            },
            ErrorCodeEnum.AUTHORIZATION_ERROR,
        );
    }
}