import express from "express";
import { RequirementError, InternalServerError, FailToMatchError, ErrorCodeEnum, CustomExpressResponse, CustomExpressRequest } from "../infrastructure";
import { writeErrorFile } from "./file.service";


export function sendSuccess(data: any, res: CustomExpressResponse, status = 200): void {
    return res.status(status).send({
        error: null,
        data: data,
    }).end();
}

export function sendError(error: any, req: CustomExpressRequest, res: CustomExpressResponse, status = 500): void {
    switch (error.code) {
        case ErrorCodeEnum.NOT_FOUND:
            status = 404;
            break;
        case ErrorCodeEnum.INTERNAL_SERVER_ERROR:
            status = 500;
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
        case ErrorCodeEnum.DELETE_MAIN_PRODUCT_VARIANT_ERROR:
        case ErrorCodeEnum.VALIDATION_FAIL_TO_MATCH_ERROR:
        case ErrorCodeEnum.VALIDATION_MATCH_EMPTY_ERROR:
            status = 400;
            break;
        case ErrorCodeEnum.TOKEN_EXPIRED_ERROR:
        case ErrorCodeEnum.INVALID_TOKEN_ERROR:
        case ErrorCodeEnum.TOKEN_NOT_PROVIDED_ERROR:
        case ErrorCodeEnum.CLIENT_IS_NOT_ACTIVE:
        case ErrorCodeEnum.AUTHORIZATION_ERROR:
        case ErrorCodeEnum.UNAUTHORIZED:
            status = 401;
            break;
        case ErrorCodeEnum.FILE_EXTENSION_ERROR:
            status = 415; // Unsupported Media Type
            break;
        case ErrorCodeEnum.SYSTEM_ERROR:
            status = 500;
            break;
        case ErrorCodeEnum.PROCESS_IS_PENDING_ERROR:
            status = 409; // Conflict
            break;
        case ErrorCodeEnum.NETWORK_CONNECTION_ERROR:
            status = 503; // Service Unavailable (network-related)
            break;
        default:
            status = 500;
            break;
    }
    

    if (status == ErrorCodeEnum.INTERNAL_SERVER_ERROR) {
        writeErrorFile(error, req);
        return res.status(status).send({
            error: {
                code: ErrorCodeEnum.INTERNAL_SERVER_ERROR,
                message: new InternalServerError().translates[res.lang]
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

export function sendValidationError(error: any, res: CustomExpressResponse, status = 422): void {
    const label = error?.details[0]?.context?.label;
    const type = error?.details[0]?.type;

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