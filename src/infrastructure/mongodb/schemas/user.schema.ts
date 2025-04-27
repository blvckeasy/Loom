import { modelOptions, prop, Severity } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { UserStatusEnum } from "../../enums/status";
import { UserRoleEnum } from "../../enums";

@modelOptions({
    options: {
        allowMixed: Severity.ALLOW,
    },
})
export class UserSchema {
    @prop({ required: true })
    email: string;
    
    @prop({ required: true })
    password: string;

    @prop({ enum: UserStatusEnum, default: UserStatusEnum.ACTIVE })
    status: UserStatusEnum;
    
    @prop({ enum: UserRoleEnum, default: UserRoleEnum.CLIENT })
    role: UserRoleEnum;

    _id: Types.ObjectId;

    createdAt: Date;
}