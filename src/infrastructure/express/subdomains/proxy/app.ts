import express from 'express';
import { mainRoutes } from './modules';
import { ModernMiddleware } from '../../middlewares';

const proxyApp = express();

proxyApp.use(ModernMiddleware, mainRoutes);

export default proxyApp;