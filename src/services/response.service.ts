import express from "express";
import { RequirementError, InternalServerError, FailToMatchError, ErrorCodeEnum } from "../infrastructure";
import { writeErrorFile } from "./file.service";


export function sendSuccess(data: any, res: express.Response, status = 200): void {
    return res.status(status).send({
        error: null,
        data: data,
    }).end();
}

export function sendError(error: any, req: express.Request, res: express.Response, status = 500): void {
    switch (error.code) {
        case ErrorCodeEnum.NOT_FOUND:
            status = 404;
            break;
        case ErrorCodeEnum.CONFIRMATION_CODE_INVALID:
            status = 412;
            break;
        case ErrorCodeEnum.CONFIRMATION_CODE_EXPIRED:
            status = 403;
            break;
        case ErrorCodeEnum.CONFIRMATION_VALIDATE_ATTEMPT_EXCEEDED:
        case ErrorCodeEnum.CONFIRMATION_RESEND_TIMEOUT:
        case ErrorCodeEnum.CLIENT_ALREADY_EXISTS_ERROR:
        case ErrorCodeEnum.INCORRECT_PASSWORD_ERROR:
        case ErrorCodeEnum.REQUIREMENT_ERROR:
        case ErrorCodeEnum.LIMIT_EXCEEDED_ERROR:
        case ErrorCodeEnum.FILE_SIZE_LARGE_ERROR:
        case ErrorCodeEnum.GUEST_CANNOT_CREATE_ERROR:
        case ErrorCodeEnum.ACTIVE_PRODUCT_VARIANT_IS_REQUIRED_ERROR:
            status = 400;
            break;
        case ErrorCodeEnum.TOKEN_EXPIRED_ERROR:
        case ErrorCodeEnum.INVALID_TOKEN_ERROR:
        case ErrorCodeEnum.TOKEN_NOT_PROVIDED_ERROR:
        case ErrorCodeEnum.CLIENT_IS_NOT_ACTIVE:
        case ErrorCodeEnum.AUTHORIZATION_ERROR:
            status = 401;
            break;
        default:
            status = 500;
            break;
    }

    if (status == 500) {
        writeErrorFile(error, req);
        return res.status(status).send({
            error: {
                code: error.code,
                message: new InternalServerError().translates[res.lang],
            },
            data: null,
        });
    }

    return res.status(status).send({
        error: {
            code: error.code,
            message: error?.translates ? error.translates[res.lang] : error?.message,
        },
        data: null,
    }).end();
}

export function sendValidationError(error: any, res: express.Response, status = 422): void {
    const label = error?.details[0]?.context?.label;
    const type = error?.details[0]?.type;

    console.log(console.log(error.details[0].context.error));

    switch (type) {
        // TODO enter all JOI errors
        case 'any.required':
            error = new RequirementError(label);
            break;

        case 'any.custom':
            error = error.details[0]?.context.error;
            break;

        default:
            error = new FailToMatchError(label);
    }

    return res.status(status).send({
        error: {
            code: error.code,
            message: error?.translates[res.lang],
        },
        data: null,
    }).end();
}