import { Router, Request, Response, NextFunction } from 'express';
import { proxyRoute } from './proxy';

const routes = Router({ mergeParams: true });

routes.use(proxyRoute.path,    proxyRoute.router);

export default routes;