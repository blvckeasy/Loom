import { UserEntity } from "../../../domains";
import { LanguageEnum } from "../../enums";

interface BaseRequestInterface {
    refId?: string;
    user?: UserEntity;
    baseLang?: LanguageEnum;
}

export type BaseCaseParamsInterface<T> = T & BaseRequestInterface;

export interface BaseCaseInterface<IRequest, IResponse> {
    execute(request?: BaseCaseParamsInterface<IRequest>): Promise<IResponse>;
}
