import express from 'express';
import { LanguageEnum } from '../../enums';

export type CustomExpressResponse  = express.Response & { lang: LanguageEnum }