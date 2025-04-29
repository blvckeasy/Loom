import { BaseError } from "./index";
import { ErrorCodeEnum } from "../shared/enums";

export class RequirementError extends BaseError {
    constructor(field: string, message?: string) {
        super(
            message ? message : `'${field}' is required field`,
            {
                en: `'${field}' is required field`,
                ru: `'${field}' обязательное поле`,
                uz: `'${field}' majburiy maydon`,
            },
            ErrorCodeEnum.REQUIREMENT_ERROR
        );
    }
}