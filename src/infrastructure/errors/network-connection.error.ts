import { BaseError } from "./base.error";
import { ErrorCodeEnum } from "../shared/enums";

export class NetworkConnectionError extends BaseError {
    constructor(
        message?: string
    ) {
        super(
            message ? message : `Network connection error`,
            {
                en: `Unable to connect to the network.`,
                ru: `Не удалось подключиться к сети.`,
                uz: `Tarmoqqa ulanish imkoni bo‘lmadi.`,
            },
            ErrorCodeEnum.NETWORK_CONNECTION_ERROR
        );
    }
}
