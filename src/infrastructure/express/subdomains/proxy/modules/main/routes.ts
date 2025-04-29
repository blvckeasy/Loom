import { Router } from 'express';
import { CheckUserSessionMiddleware } from '../../../../middlewares';
import { 
    UseMainController, 
} from './conrollers';

const mainRouter = Router({ mergeParams: true });

mainRouter.use(UseMainController)


export default {
    path: "/",
    router: mainRouter
}