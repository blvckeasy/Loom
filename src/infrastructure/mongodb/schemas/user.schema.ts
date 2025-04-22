import { modelOptions, prop, Severity } from "@typegoose/typegoose";
import { Types } from "mongoose";

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
    
    _id: Types.ObjectId;

    createdAt: Date;
}