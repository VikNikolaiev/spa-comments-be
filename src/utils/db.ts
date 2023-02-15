import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv'

dotenv.config();

const { DB, USER, PASS, HOST } = process.env;

if (!DB || !USER || !PASS || !HOST) {
  throw new Error('Missing DB config');
}

export const sequelize = new Sequelize(
  DB,
  USER,
  PASS,
  {
    host: HOST,
    dialect: 'mysql',
    dialectModule: require('mysql2'),
  },
);