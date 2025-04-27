import {
    BaseCaseInterface,
    BaseListParams,
    ListInterface,
    BaseCaseParamsInterface,
} from "../../infrastructure";
import { Repository } from "../repositories";
import { ProxyEntity } from "../entities";

export class GetProxyListCase implements BaseCaseInterface<BaseListParams, ListInterface<ProxyEntity>> {
    
    async execute(params: BaseCaseParamsInterface<BaseListParams>): Promise<ListInterface<ProxyEntity>> {

        const data: ListInterface<ProxyEntity> = {
            items: [],
            meta: {
                count: 0,
                currentPage: params.pagination.page,
                pages: 0,
            },
        };

        data.meta.count = await Repository.Proxy().countDocumentsByFilter(
            params.filter
        );

        data.meta.pages = Math.ceil(data.meta.count / params.pagination.size);
        
        if (data.meta.pages < params.pagination.page) {
            data.meta.currentPage = data.meta.pages;
        }
        
        data.items = await Repository.Proxy().list(
            params.filter,
            params.pagination,
            params.sort
        );

        return data;
    }
}

export const getProxyListCase: BaseCaseInterface<
    BaseListParams,
    ListInterface<ProxyEntity>
> = new GetProxyListCase();
