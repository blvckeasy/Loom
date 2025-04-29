import { BaseError } from "./base.error";
import { ErrorCodeEnum } from "../shared/enums";

export class FailToMatchError extends BaseError {
    constructor(field: string, message?: string) {
        super(
            message ? message : `'${field}' is fail to match`,
            {
                en: `'${field}' is fail to match`,
                ru: `'${field}' не соответствует`,
                uz: `'${field}' mos kelmadi`,
            },
            ErrorCodeEnum.VALIDATION_FAIL_TO_MATCH_ERROR
        );
    }
}
