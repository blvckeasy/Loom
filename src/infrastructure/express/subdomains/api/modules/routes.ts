import { Router, Request, Response, NextFunction } from 'express';
import { proxyRoutes } from './proxy';

const routes = Router({ mergeParams: true });

routes.use(proxyRoutes.path,    proxyRoutes.router);

export default routes;