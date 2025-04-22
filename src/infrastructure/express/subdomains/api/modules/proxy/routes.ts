import { Router, Request, Response, NextFunction } from 'express';
import { 
    GetProxyController,
    CreateProxyController,
} from './controllers'

const proxyRouter = Router({ mergeParams: true });

proxyRouter
    .get('/get',            GetProxyController)
    .post("/create-proxy",  CreateProxyController)

export default {
    path:   "/proxy",
    router: proxyRouter
}