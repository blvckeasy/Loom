import Joi from 'joi';

export class UpdateAccountPasswordBody {
    new_password: string;
    confirm_password: string;

    constructor(body: any) {
        this.new_password = body?.new_password;
        this.confirm_password = body?.confirm_password;
    }

    async validate() {
        const { error, value } = UpdateAccountPasswordBodySchema.validate(this);

        if (error) {
            throw error;
        }

        return value;
    }
}

export const UpdateAccountPasswordBodySchema = Joi.object<UpdateAccountPasswordBody>({
    new_password: Joi.string().required().min(8).max(40),
    confirm_password: Joi.string().required().valid(Joi.ref('new_password'))
});