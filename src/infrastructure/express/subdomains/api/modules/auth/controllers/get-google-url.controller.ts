import express from 'express';
import { sendError, sendSuccess } from "../../../../../../../services";
import { googleAuthConfig } from '../../../../../../config';
import { CustomExpressRequest, CustomExpressResponse } from '../../../../../../shared';

export async function GetGoogleURLController (req: CustomExpressRequest, res: CustomExpressResponse): Promise<void> {
    try {
        const CLIENT_ID         = googleAuthConfig.client_id;
        const REDIRECT_URI      = googleAuthConfig.redirect_uri;

        const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;

        return sendSuccess({ url }, res);
    } catch (error) {
        return sendError(error, req, res);
    }
}