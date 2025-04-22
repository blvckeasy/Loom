import { FilterQuery } from "mongoose";
import { UserEntity } from "../../../../domains/entities";
import { BaseCRUDRepositoryInterface } from "../base";

export interface UserRepositoryInterface extends BaseCRUDRepositoryInterface<UserEntity> {
    countDocumentsByFilter(filter: FilterQuery<any>): Promise<number>;
}