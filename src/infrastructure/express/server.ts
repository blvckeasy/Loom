import express from 'express';
import bodyParser from 'body-parser';
import vhost from 'vhost';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import { apiApp, proxyApp } from './subdomains'


const server = express();
const host   = process.env.SERVER_HOST; 

server.set('trust proxy', 1);
server.set('subdomain offset', 2);

server.use(rateLimit({
    windowMs: 2 * 60 * 1000,        // 2 minute,
    limit: 20,                      // har IP uchun 2 minutda 20 ta so'rov uchun ruxsat 
    standardHeaders: 'draft-8',
    legacyHeaders: false,
}))
server.use(cors({ origin: "*" }));
server.use(bodyParser.json());

server.use(vhost(`api.${host}`, apiApp));
server.use(vhost(`${process.env.PROXY_SUBDOMAIN_PREFIX}*.${host}`, proxyApp))

// testoviy
// server.use(vhost(`${host}`, apiApp));

export default server;
