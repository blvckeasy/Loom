import { Router } from 'express';
import { mainRoute } from './main';

const routes = Router({ mergeParams: true });

routes.use(mainRoute.path, mainRoute.router);

export default routes;