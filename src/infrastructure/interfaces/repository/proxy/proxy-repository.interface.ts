import { FilterQuery } from "mongoose";
import { ProxyEntity } from "../../../../domains";
import { BaseCRUDRepositoryInterface } from "../base";

export interface ProxyRepositoryInterface extends BaseCRUDRepositoryInterface<ProxyEntity> {
    countDocumentsByFilter(filter: FilterQuery<any>): Promise<number>;
}