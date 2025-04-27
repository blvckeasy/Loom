import { FilterQuery } from "mongoose";
import { PaginationInterface } from "../../../../infrastructure";

export interface BaseListParams {
    pagination: PaginationInterface;
    filter: FilterQuery<any>;
    sort: any;
}
