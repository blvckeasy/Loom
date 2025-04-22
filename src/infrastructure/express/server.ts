import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { routes } from './subdomains'

const server = express();

server.use(cors({ origin: "*" }));
server.set('trust proxy', true);
server.use(bodyParser.json());

server.use("/v1", routes);


export default server;
