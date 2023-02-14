import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv'

dotenv.config();

export const sequelize = new Sequelize(
  'grandins_dzencode',
  'grandins_dzencode',
  '5ks*vK7X+2',
  {
    host: 'grandins.mysql.tools',
    dialect: 'mysql',
    dialectModule: require('mysql2'),
  },
);