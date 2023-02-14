import express, { Router } from 'express';
import * as commentsController from '../controllers/comments';

export const commentsRouter = Router();

commentsRouter.get('/', commentsController.getAll);
//router.get('/:colorId', usersController.getOne);

commentsRouter.post('/', express.json(), commentsController.addOne);

