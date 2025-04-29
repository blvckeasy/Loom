import express from 'express';
import { apiRoutes } from './modules';
import { ModernMiddleware } from '../../middlewares';

const apiApp = express();

apiApp.use("/v1", ModernMiddleware, apiRoutes);

export default apiApp;