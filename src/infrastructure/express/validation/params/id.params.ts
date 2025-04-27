import Joi from "joi";

export class IdParams {
    /** ID */
    _id: string;

    constructor(params: IdParams) {
        if (params) {
            this._id = params._id;
        }
    }

    async validate() {
        return await IdParamsSchema.validateAsync(this);
    }
}

export const IdParamsSchema = Joi.object<IdParams>({
    _id: Joi.string().trim().required().pattern(new RegExp("^[0-9a-fA-F]{24}$")),
});
