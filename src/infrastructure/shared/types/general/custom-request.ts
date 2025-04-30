import express from 'express';
import { UserEntity } from '../../../../domains';
import { LanguageEnum } from '../../enums';

export type ExpressRequest  = express.Request & { lang: LanguageEnum }
export type CustomExpressRequest = ExpressRequest & { user: UserEntity };