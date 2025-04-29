import { ErrorCodeEnum } from '../shared/enums';
import { BaseError } from './base.error';

export class InternalServerError extends BaseError {
    constructor(message: string = "Internal Server Error") {
        super(
            message,
            {
                en: 'Internal Server Error',
                ru: 'Внутренняя ошибка сервера',
                uz: 'Serverdagi ichki xatolik',
            },
            ErrorCodeEnum.INTERNAL_SERVER_ERROR
        );
    }
}