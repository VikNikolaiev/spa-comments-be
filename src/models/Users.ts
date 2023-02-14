// id, name, mail, page

import { sequelize } from '../utils/db';
import { DataTypes } from "sequelize";

export const User = sequelize.define('user', {
  id: {
    field: 'id',
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    field: 'name',
    type: DataTypes.STRING,
  },
  mail: {
    field: 'mail',
    type: DataTypes.STRING,
  },
  page: {
    field: 'page',
    type: DataTypes.STRING,
  },
  createdAt: {
    type: 'TIMESTAMP',
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
}, {
  tableName: 'users',
  updatedAt: false,
})