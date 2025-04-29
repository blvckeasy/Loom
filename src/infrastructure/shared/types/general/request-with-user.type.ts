import express from 'express';
import { UserEntity } from '../../../../domains';

export type RequestWithUser = express.Request & { user: UserEntity };