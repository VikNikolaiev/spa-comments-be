import {Request, Response} from 'express';
import fetch from 'node-fetch';
import * as commentsService from '../services/comments';
import * as usersService from '../services/users';

interface Comment {
  id: number,
  userId: number,
  parrentId: number,
  text: string,
  file: string,
  page: string,
  createdAt: Date,
}
interface FullComment extends Comment {
  childrenComments: Comment[];
}

export const getAll = async (req: Request, res: Response) => {
  const { page, perPage, sort } = req.query;
  console.log(sort);

  const commentsCount = await commentsService.getParentCount();
  const numPage = Number(page) || 1;
  const numPerPage = Number(perPage) || 25;
  const sortType = String(sort) || 'date-desc';

  const parentComments = await commentsService.getParentAll(numPage, numPerPage, sortType);

  async function compoundComments(parentComments: Comment[]) :Promise<FullComment[]>  {

    return Promise.all(parentComments.map(async parentComment => {
      const user = await usersService.getOne(parentComment.userId);

      const childComments = await commentsService.getChilds(parentComment.id);

      return {
        // user,
        ...parentComment,
        childrenComments: await compoundComments(childComments),
      };
    }));
  }

  res.setHeader('Access-Control-Expose-Headers', 'comments-count');
  res.setHeader('comments-count', commentsCount.toString());
  res.send(await compoundComments(parentComments));
};

const validateHuman = async (token: string) => {
  const secret = '6LdsxGEkAAAAAIOrzK50wy7QJqRQV-ntB_GwDjDx';
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
    {
      method:"POST",
    },
  );
  const data = await response.json();

  return data.success;
}

export const addOne = async (req: Request, res: Response) => {
  console.log(req.body)
  const {user, parrentId, text, file, token} = req.body;

  const isHuman = await validateHuman(token);

  if (!isHuman) {
    res.statusCode = 400;
    res.send({errors: ["bot"]});
    return;
  }

  if(!user || !user.name || !user.mail || !text
  ) {
    res.sendStatus(422);
    return;
  }

  const userId = await usersService.postOne(user.name, user.mail, user.page);

  if (userId) {
    const newComment = await commentsService.postOne(userId, parrentId, text, file);

    res.statusCode = 201;
    res.send(newComment);
    return;
  }

  res.sendStatus(422);
}

