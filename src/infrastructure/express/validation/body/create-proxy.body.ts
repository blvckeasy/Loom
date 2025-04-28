import Joi from "joi";

export class CreateProxyBody {
    
    port: number;

    constructor(body: CreateProxyBody) {
        if (body) {
            this.port = body.port;
        }
    }

    async validate() {
        return await CreateProxyBodySchema.validateAsync(this);
    }
}

export const CreateProxyBodySchema = Joi.object<CreateProxyBody>({
    port: Joi.number().min(0).max(65535).required()
});
