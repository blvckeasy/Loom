import express from 'express';
import axios from 'axios';
import { sendError, sendSuccess } from '../../../../../../../services';
import { Repository } from '../../../../../../../domains';
import { NetworkConnectionError, NotFoundError } from '../../../../../../errors';

export async function UseMainController(req: express.Request, res: express.Response): Promise<void> {
    try {
        const { subdomains, url, method, headers, body } = req;

        const subdomain = subdomains[0];

        const [proxy] = await Repository.Proxy().list({ server_subdomain: subdomain });

        if (!proxy) {
            throw new NotFoundError("Proxy");
        }

        let response;

        try {
            response = await axios({
                url: `http://${proxy._user_ip}:${proxy._user_port}${url}`,
                method,
                headers: {
                    'Content-Type': headers['content-type'] || 'application/json',
                    'User-Agent': headers['user-agent'] || '',
                    'Host': headers['host'] || ''
                },
                data: body,
                timeout: 5000  // 5 sekund timeout
            });
        } catch {
            throw new NetworkConnectionError();
        }

        sendSuccess(response.data, res);
    } catch (error) {
        sendError(error, req, res);
    }
}
