import { Router, Request, Response, NextFunction } from 'express';
import { 
    GetProxyController,
    CreateProxyController,
} from './controllers'
import { CheckUserSessionMiddleware } from '../../../../middlewares';

const proxyRouter = Router({ mergeParams: true });

proxyRouter
    .get('/get',            CheckUserSessionMiddleware, GetProxyController)
    .post("/create-proxy",  CheckUserSessionMiddleware, CreateProxyController)

export default {
    path:   "/proxy",
    router: proxyRouter
}