import { BaseError } from "./base.error";
import { ErrorCodeEnum } from "../shared/enums";

export class InvalidTokenError extends BaseError {
    constructor(message: string = "Invalid token") {
        super(
            message,
            {
                en: "Invalid token",
                ru: "Неверный токен",
                uz: "Token yaroqsiz",
            },
            ErrorCodeEnum.INVALID_TOKEN_ERROR
        );
    }
}
