import dockerNames from 'docker-names';
import { v4 as uuidv4 } from 'uuid';
import { sendError, sendSuccess, sendValidationError } from '../../../../../../../services';
import { ProxyEntity, Repository } from '../../../../../../../domains';
import { GetProxyByIdResponse } from '../../../../../responses';
import { CreateProxyBody } from '../../../../../validation';
import { CustomExpressRequest, CustomExpressResponse } from '../../../../../../shared';


export async function CreateProxyController (req: CustomExpressRequest, res: CustomExpressResponse): Promise<void> {  
    
    let body: CreateProxyBody;

    try {
        body = await new CreateProxyBody(req.body).validate();
    } catch (error) {
        return sendValidationError(error, res);
    }
    
    try {
        const user = req.user;

        const server_subdomain_prefix = process.env.PROXY_SUBDOMAIN_PREFIX || "";

        const server_subdomain = `${server_subdomain_prefix}${dockerNames.getRandomName()}-${uuidv4().slice(0, 5)}`;

        const server_protocol = process.env.SERVER_PROTOCOL || 'http';

        const server_domain = process.env.SERVER_DOMAIN || 'localhost';

        const user_IP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        const user_port = body.port;

        const newProxyEntity = new ProxyEntity()
            .buildServerProtocol(server_protocol)
            .buildServerSubdomain(server_subdomain)
            .buildServerDomain(server_domain)
            .buildUserIP(user_IP)
            .buildUserPort(user_port)
            .buildUserId(user._id)

        const newProxy = await Repository.Proxy().create(newProxyEntity);

        const response = new GetProxyByIdResponse(newProxy);

        return sendSuccess(response, res);
        
    } catch (error) {

        return sendError(error, req, res);
    
    }

}