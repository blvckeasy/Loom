import express from 'express';
import { Types } from "mongoose";
import { UserAccountVerificationStatusEnum, UserProfileStatusEnum, UserRoleEnum } from "../../../enums";
import { UserEntity } from "../../../../domains";
import { Token } from "../../../../services";
import { tokenConfig } from "../../../config";

export class GoogleCallbackResponse {

    _id: Types.ObjectId;

    email: string;

    name: string;

    given_name: string;

    family_name: string;

    picture: string;

    verification_status: UserAccountVerificationStatusEnum;

    profile_status: UserProfileStatusEnum;

    role: UserRoleEnum;

    createdAt: Date;

    token: string;

    constructor (user: UserEntity, req: express.Request) {
        this._id                    = user.getId();
        this.email                  = user.getEmail();
        this.name                   = user.getName();
        this.given_name             = user.getGivenName();
        this.family_name            = user.getFamilyName();
        this.picture                = user.getPicture();
        this.verification_status    = user.getVerificationStatus();
        this.profile_status         = user.getProfileStatus();
        this.role                   = user.getRole();
        this.createdAt              = user.getCreatedAt();

        const userAgent = req.headers['user-agent'];

        this.token = new Token(tokenConfig.access.secretKey, tokenConfig.access.expireSeconds)
            .buildPayload({ user_id: this._id, 'user-agent': userAgent })
            .sign()
    }

}
