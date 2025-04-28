import express from 'express';
import axios from 'axios';
import { sendError, sendSuccess } from "../../../../../../../services";
import { googleAuthConfig } from '../../../../../../config';
import { Repository, UserEntity } from '../../../../../../../domains';
import { UserInfoInterface } from '../../../../../../interfaces';
import { AuthorizationError } from '../../../../../../errors';
import { GoogleCallbackResponse } from '../../../../../responses';
import { UserAccountVerificationStatusEnum, UserProfileStatusEnum } from '../../../../../../enums';


export async function GetGoogleCallbackController (req: express.Request, res: express.Response): Promise<void> {
    try {

        const { code } = req.query;

        const { data }: any = await axios.post('https://oauth2.googleapis.com/token', {
            client_id:      googleAuthConfig.client_id,
            client_secret:  googleAuthConfig.client_secret,
            code,
            redirect_uri:   googleAuthConfig.redirect_uri,
            grant_type:     'authorization_code',
        });

        const { access_token } = data;

        const { status, data: profile }: UserInfoInterface = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        if (status !== 200) {
            throw new AuthorizationError("Google Auth Error");
        }

        const [foundUser] = await Repository.User().list({
            $and: [
              { email: profile.email },
              { profile_status: UserProfileStatusEnum.ACTIVE }
            ]
        });

        const user = foundUser
            ? foundUser
            : await Repository.User().create(
                new UserEntity()
                    .buildEmail(profile.email)
                    .buildName(profile.name)
                    .buildGivenName(profile.given_name)
                    .buildFamilyName(profile.family_name)
                    .buildPicture(profile.picture)
                    .buildVerificationStatus(UserAccountVerificationStatusEnum.SET_NEW_PWD)
                );

        const response = new GoogleCallbackResponse(user, req);

        return sendSuccess(response, res);
    
    } catch (error) {
        return sendError(error, req, res);
    }
}