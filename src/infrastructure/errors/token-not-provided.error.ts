import { BaseError } from "./base.error";
import { ErrorCodeEnum } from "../enums";

export class TokenNotProvidedError extends BaseError {
    constructor(message: string = "Token not provided") {
        super(
            message,
            {
                en: "Token not provided",
                ru: "Токен не предоставлен",
                uz: "Token taqdim etilmagan",
            },
            ErrorCodeEnum.TOKEN_NOT_PROVIDED_ERROR
        );
    }
}
