import { getModelForClass, Severity } from '@typegoose/typegoose';
import { ProxySchema } from '../../schemas';

export const ProxyModel = getModelForClass(ProxySchema, {
    schemaOptions: {
        collection: 'proxies',
        timestamps: true,
        minimize: true,
        versionKey: false
    },
    options: {
        allowMixed: Severity.ALLOW,
    }
})