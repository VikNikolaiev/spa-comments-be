import { Comment } from '../models/Comment';
import {User} from "../models/Users";

Comment.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id'
});

Comment.belongsTo(Comment, {
  foreignKey: 'id',
  targetKey: 'id'
});

export const getParentCount = async() => {
  const amountParentComments = await Comment.count({
    where: {
      parrent_id: null
    }
  });

  return amountParentComments;
};

export const getParentAll = async (page: number, perPage:number, sortType: string) => {
  let sortField = '';
  let sortDirection = '';
  let table;

  switch (true) {
    case(sortType.includes('name')):
      sortField = 'name';
      table = User;
      break;
    case(sortType.includes('mail')):
      sortField = 'mail';
      table = User;
      break;
    case(sortType.includes('date')):
    default:
      sortField = 'createdAt';
      table = Comment;
      break;
  }

  switch (true) {
    case(sortType.includes('desc')):
      sortDirection = 'DESC';
      break;
    default:
      sortDirection = 'ASC';
      break;
  }

  try {
    const { count, rows } = await Comment.findAndCountAll({
      where: {
        parrent_id: null
      },
      include: [{
        model: User,
        required: true,
      }],
      order: [[table, sortField, sortDirection]],
    });

    const startPageItem = perPage * page - perPage + 1;
    const finishPageItem = perPage * page < count ? perPage * page : count;

    const currentPageParents = rows.slice(startPageItem - 1, finishPageItem);



    return currentPageParents.map(parent => parent.dataValues);
  } catch (error) {
    throw new Error(`Unable to connect to the database: ${error}`);
  }
}

export const getChilds = async (child: number) => {
  const childs = await Comment.findAll({
    where: {
      parrent_id: child
    },
    include: [{
      model: User,
      required: true,
    }],
  });

  return childs.map(child => child.dataValues);
}

export const postOne = async(userId:number, parrentId: string, text: string, file: string) => {
  return await Comment.create({
    userId: userId,
    parrentId: parrentId,
    text: text,
    file: file,
  });
};
