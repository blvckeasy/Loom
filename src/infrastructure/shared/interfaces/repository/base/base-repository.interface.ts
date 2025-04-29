import { FilterQuery, Types } from "mongoose";
import { PaginationInterface } from "../../pagination.interface";

export interface BaseRepositoryInterface<K> {
    getById(_id: Types.ObjectId): Promise<K | null>;
    list(
        filter?: FilterQuery<any>,
        pagination?: PaginationInterface,
        sort?: any
    ): Promise<Array<K>>;
}