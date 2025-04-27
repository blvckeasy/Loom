import { BaseError } from "./index";
import { ErrorCodeEnum } from "../enums";

export class ValidationError extends BaseError {
    constructor(field: string, message?: string) {
        super(
            message ? message : `'${field}' is invalid`,
            {
                en: `'${field}' is invalid`,
                ru: `'${field}' инвалид поля`,
                uz: `'${field}' mos emas`,
            },
            ErrorCodeEnum.VALIDATION_FAIL_TO_MATCH_ERROR
        );
    }
}