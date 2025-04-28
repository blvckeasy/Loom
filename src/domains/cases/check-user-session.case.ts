import { BaseCaseInterface, InvalidTokenError, NotFoundError, TokenExpiredError, UserNotFoundError, tokenConfig } from "../../infrastructure";
import { ErrorCodeEnum } from "../../infrastructure/enums";
import { Token } from "../../services";
import { UserEntity } from "../entities";
import { Repository } from "../repositories";

interface CheckUserSessionCaseParams {
    accessToken: string;
}

interface CheckUserSessionCaseReponse {
    user: UserEntity;
}

export class CheckUserSessionCase implements BaseCaseInterface<CheckUserSessionCaseParams, CheckUserSessionCaseReponse> {
    async execute (params: CheckUserSessionCaseParams): Promise<CheckUserSessionCaseReponse> {
        try {
            const payload = new Token(tokenConfig.access.secretKey, tokenConfig.access.expireSeconds)
                .buildToken(params.accessToken)
                .verify()
            
            const user = await Repository.User().getById(payload['user_id']);

            if (!user) throw new UserNotFoundError();

            const response: CheckUserSessionCaseReponse = { user }
            return response;
        } catch (error) {
            if (error.message == 'jwt expired') { 
                throw new TokenExpiredError();
            }
    
            if (error.message === 'invalid signature' || error.message === 'jwt malformed') {
                throw new InvalidTokenError();
            }
            
            if (error instanceof UserNotFoundError) {
                throw error;                
            }
            
            error.code = ErrorCodeEnum.AUTHORIZATION_ERROR;
            throw error;
        }
    }
}

export const checkUserSessionCase: BaseCaseInterface<CheckUserSessionCaseParams, CheckUserSessionCaseReponse> = new CheckUserSessionCase();