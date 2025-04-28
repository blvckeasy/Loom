import { Router } from 'express';
import { proxyRoute } from './proxy';
import { authRoute } from './auth';

const routes = Router({ mergeParams: true });

routes.use(authRoute.path,  authRoute.router);
routes.use(proxyRoute.path, proxyRoute.router);

export default routes;