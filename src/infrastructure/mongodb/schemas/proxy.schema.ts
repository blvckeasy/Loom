import { modelOptions, prop, Severity } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { ProxyStatusEnum } from "../../enums";

@modelOptions({
    options: {
        allowMixed: Severity.ALLOW,
    }
})
export class ProxySchema {
    @prop({ required: true })
    server_protocol: string;

    @prop({ required: true })
    server_subdomain: string;

    @prop({ required: true })
    server_host: string;

    @prop({ required: true })
    user_ip: string;

    @prop({ required: true })
    user_port: number;

    @prop({ enum: ProxyStatusEnum, default: ProxyStatusEnum.ACTIVE })
    status: ProxyStatusEnum;

    @prop({ type: Types.ObjectId, ref: 'users', required: true })
    user_id: Types.ObjectId;

    _id: Types.ObjectId;

    createdAt: Date;
}