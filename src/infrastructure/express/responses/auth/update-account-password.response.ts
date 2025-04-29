import express from 'express';
import { Types } from "mongoose";
import { UserAccountVerificationStatusEnum, UserProfileStatusEnum, UserRoleEnum } from "../../../shared/enums";
import { UserEntity } from "../../../../domains";

export class UpdateAccountPasswordResponse {

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

    constructor (user: UserEntity) {
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
    }

}
