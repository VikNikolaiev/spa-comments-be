import { Request, Response } from 'express';
import * as usersService from '../services/users';

export const getAll = async (req: Request, res: Response) => {
  const colors = await usersService.getAll();

  res.send(colors);
};