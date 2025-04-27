import Joi from "joi";
import { Types, isValidObjectId } from "mongoose";
import { pagination, ValidationError } from "../../../../infrastructure";


export class GetProxiesQuery {
    
    _id?: Types.ObjectId;

    user_id?: Types.ObjectId;

    page: number;

    size: number;

    constructor(params: Partial<GetProxiesQuery>) {
        if (params) {
            this._id        = params._id;
            this.user_id    = params.user_id;
            this.page       = params.page;
            this.size       = params.size;
        }
    }

    getFilterQuery() {
        return Object.fromEntries(
            Object.entries(this).filter(([key, value]) => value !== undefined && !['page', 'size'].includes(key))
        );
    }

    async validate() {
        const { error, value } = GetProxiesQuerySchema.validate(this);

        if (error) {
            throw error;
        }

        return value;
    }
}

export const GetProxiesQuerySchema = Joi.object<GetProxiesQuery>({
    _id:        Joi.optional(),
    user_id:    Joi.optional(),
    page:       Joi.number().default(pagination.page),
    size:       Joi.number().default(pagination.size)
}).custom((value: GetProxiesQuery): GetProxiesQuery => {
    const { _id, user_id } = value;

    if (_id && !isValidObjectId(_id)) {
        throw new ValidationError("_id")
    }

    if (user_id && !isValidObjectId(user_id)) {
        throw new ValidationError("user_id");
    }

    console.log({value});

    return value;
})