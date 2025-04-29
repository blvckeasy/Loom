import { modelOptions, prop, Severity } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { 
    UserAccountVerificationStatusEnum, 
    UserProfileStatusEnum, 
    UserRoleEnum 
} from "../../shared/enums";

@modelOptions({
    options: {
        allowMixed: Severity.ALLOW,
    },
})
export class UserSchema {
    _id: Types.ObjectId;

    @prop({ required: true })
    email: string;

    @prop()
    name: string;

    @prop()
    given_name: string;

    @prop()
    family_name: string;

    @prop()
    picture: string;
    
    @prop()
    password: string;

    @prop({ enum: UserAccountVerificationStatusEnum, default: UserAccountVerificationStatusEnum.UNCONFIRMED })
    verification_status: UserAccountVerificationStatusEnum;

    @prop({ enum: UserProfileStatusEnum, default: UserProfileStatusEnum.ACTIVE })
    profile_status: UserProfileStatusEnum;
    
    @prop({ enum: UserRoleEnum, default: UserRoleEnum.CLIENT })
    role: UserRoleEnum;

    createdAt: Date;
}