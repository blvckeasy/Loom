import express from 'express';
import dockerNames from 'docker-names';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';

const server = express();

let addresses: Record<string, any> = {};

server.use(cors({ origin: "*" }));
server.set('trust proxy', true);
server.use(bodyParser.json());


server.get('/get', async (req, res, next) => {
    res.send(req.subdomains); // Returns the subdomains from the request
});

server.post("/create-proxy", async (req: express.Request, res, next) => {
    console.log(req.subdomains);

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const subdomain = `${dockerNames.getRandomName()}-${uuidv4().slice(0, 5)}`;

    const protocol = process.env.SERVER_PROTOCOL || 'http';
    const localhost = process.env.SERVER_HOST || 'localhost';
    const port = req.body.port;

    addresses[subdomain] = { ip, port };

    res.send({
        url: `${protocol}://${subdomain}.${localhost}:${port}`
    });
});

export default server;
