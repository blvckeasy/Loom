import express from 'express';
import { ModernMiddleware } from '../../middlewares';
import { proxyRoute } from './modules/proxy';

const apiApp = express();

apiApp.use(ModernMiddleware);
apiApp.use(proxyRoute.path, proxyRoute.router);

export default apiApp;