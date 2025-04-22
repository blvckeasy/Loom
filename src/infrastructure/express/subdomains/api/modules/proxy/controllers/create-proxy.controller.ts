import { Request, Response, NextFunction } from 'express';
import dockerNames from 'docker-names';
import { v4 as uuidv4 } from 'uuid';

export async function CreateProxyController (req: Request, res: Response, next: NextFunction): Promise<void> {
    let addresses: Record<string, any> = {};

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
}