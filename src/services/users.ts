import { User } from '../models/Users';
import { sequelize } from "../utils/db";
import {Comment} from "../models/Comment";

export const getAll = async () => {

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    const users = User.findAll();

    console.log(users)

    return users;

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }


}

export const getOne = async(userId: number) => {
  const findedUser = await User.findByPk(userId);

  if (!findedUser) {
    return null;
  }
  return findedUser.dataValues;
}

export const postOne = async(name: string, mail: string, page: string) => {
  const [user, created] = await User.findOrCreate({
    where: { name: name },
    defaults: {
      mail: mail,
      page: page,
    }
  });

  return user.dataValues.id || 0;
};