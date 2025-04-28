import express from 'express';
import { routes } from './modules';
import { ModernMiddleware } from '../../middlewares';

const apiApp = express();

apiApp.use("/v1", ModernMiddleware, routes);

export default apiApp;