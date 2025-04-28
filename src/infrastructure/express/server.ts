import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { apiApp } from './subdomains'
import vhost from 'vhost';

const server = express();
const host   = process.env.SERVER_HOST; 

server.set('trust proxy', true);

server.use(cors({ origin: "*" }));
server.use(bodyParser.json());

server.use(vhost(`api.${host}`, apiApp));

// testoviy
server.use(vhost(`${host}`, apiApp));

export default server;
