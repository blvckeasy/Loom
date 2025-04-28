import { Router } from 'express';
import { CheckUserSessionMiddleware } from '../../../../middlewares';
import { GetGoogleURLController, GetGoogleCallbackController } from './controllers';

const authRouter = Router({ mergeParams: true });

authRouter
    .get('/google',             GetGoogleURLController)
    .get('/google/callback',    GetGoogleCallbackController)
    // .post('/update-password',   )


export default {
    path:   "/auth",
    router: authRouter
}