import { Request } from 'express';
import { ParsedQs } from 'qs';
import { sendError, sendSuccess, sendValidationError } from '../../../../../../../services';
import { GetProxiesQuery } from '../../../../../validation';
import { getProxyListCase } from '../../../../../../../domains';
import { CustomExpressRequest, CustomExpressResponse, ListInterface, UserRoleEnum } from '../../../../../../shared';
import { GetProxyListResponse } from '../../../../../responses';


export async function GetProxyController (req: CustomExpressRequest, res: CustomExpressResponse): Promise<void> {
    try {
        const response: ListInterface<GetProxyListResponse> = {
            meta: {
                count: 0,
                currentPage: 1,
                pages: 0,
            },
            items: [],
        }

        const user = req.user;

        let query: GetProxiesQuery;

        let requestQuery: ParsedQs;

        if ([UserRoleEnum.CLIENT].includes(user._role)) {
            requestQuery = { ...req.query, user_id: user._id }
        }

        try {
            query = await new GetProxiesQuery(requestQuery).validate();
        } catch (error) {
            return sendValidationError(error, res);
        }


        const filterQuery = query.getFilterQuery();

        const getProxyListParams = {
            pagination: {
                size: query.size,
                page: query.page,
            },
            filter: filterQuery,
            sort: { createdAt: -1 },
        }

        const result    = await getProxyListCase.execute(getProxyListParams);

        response.meta   = result.meta;
        response.items  = result.items.map(proxy => new GetProxyListResponse(proxy));
        
        return sendSuccess(response, res);

    } catch (error) {
        return sendError(error, req, res);
    }
}