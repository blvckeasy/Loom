import { Router } from 'express';
import { CheckUserSessionMiddleware } from '../../../../middlewares';
import { 
    UseMainController, 
} from './controllers';

const mainRouter = Router({ mergeParams: true });

mainRouter.use(UseMainController)


export default {
    path: "/",
    router: mainRouter
}