import { BaseError } from "./base.error";
import { ErrorCodeEnum } from "../enums";

export class NotFoundError extends BaseError {
    constructor(
        target: string,
        code: ErrorCodeEnum = ErrorCodeEnum.NOT_FOUND,
        message?: string
    ) {
        super(
            message ? message : `${target} not found`,
            {
                en: `${target} not found`,
                ru: `${target} не найден`,
                uz: `${target} topilmadi`,
            },
            code
        );
    }
}
