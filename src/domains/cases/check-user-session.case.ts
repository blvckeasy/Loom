import { BaseCaseInterface, InvalidTokenError, TokenExpiredError } from "../../infrastructure";
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
            const jwtSecretKey: string      = String(process.env.JWT_SECRET);
            const jwtExpireSeconds: number  = Number(process.env.JWT_TOKEN_EXPIRE_SECONDS);

            const payload = new Token(jwtSecretKey, jwtExpireSeconds)
                .buildToken(params.accessToken)
                .verify()
            
            const user = await Repository.User().getById(payload['user_id']);

            const response: CheckUserSessionCaseReponse = { user }
            return response;
        } catch (error) {
            if (error.message == 'jwt expired') { 
                throw new TokenExpiredError();
            }
    
            if (error.message === 'invalid signature' || error.message === 'jwt malformed') {
                throw new InvalidTokenError();
            }
            
            error.code = ErrorCodeEnum.AUTHORIZATION_ERROR;
            throw error;
        }
    }
}

export const checkUserSessionCase: BaseCaseInterface<CheckUserSessionCaseParams, CheckUserSessionCaseReponse> = new CheckUserSessionCase();