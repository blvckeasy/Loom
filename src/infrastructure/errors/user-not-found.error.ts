import { BaseError } from "./base.error";
import { ErrorCodeEnum } from "../shared/enums";

export class UserNotFoundError extends BaseError {
    constructor(
        code: ErrorCodeEnum = ErrorCodeEnum.UNAUTHORIZED,
        message?: string
    ) {
        super(
            message ? message : `User not found`,
            {
                en: `User not found`,
                ru: `Ползовитель не найден`,
                uz: `Foydalanuvchi nomi topilmadi`,
            },
            code
        );
    }
}
