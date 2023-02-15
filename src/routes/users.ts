import { Router } from 'express';
import * as usersController from '../controllers/users';

export const usersRouter = Router();

usersRouter.get('/', usersController.getAll);
