import { modelOptions, prop, Severity } from "@typegoose/typegoose";
import { Types } from "mongoose";

@modelOptions({
    options: {
        allowMixed: Severity.ALLOW,
    }
})
export class ProxySchema {
    @prop({ required: true })
    protocol: string;

    @prop({ required: true })
    host: string;

    @prop({ required: true })
    port: number;

    @prop({ type: Types.ObjectId, ref: 'users', required: true })
    user_id: Types.ObjectId;

    _id: Types.ObjectId;

    createdAt: Date;
}