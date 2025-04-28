import { Router } from 'express';
import { CheckUserSessionMiddleware } from '../../../../middlewares';
import { 
    GetGoogleURLController, 
    GetGoogleCallbackController, 
    UpdateAccountPasswordController,
} from './controllers';

const authRouter = Router({ mergeParams: true });

authRouter
    .get('/google',             GetGoogleURLController)
    .get('/google/callback',    GetGoogleCallbackController)
    .patch('/update-password',  CheckUserSessionMiddleware, UpdateAccountPasswordController)


export default {
    path:   "/auth",
    router: authRouter
}