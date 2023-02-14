import { sequelize } from "../utils/db";
import { DataTypes } from "sequelize";

export const Comment = sequelize.define('comment', {
  id: {
    field: 'id',
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    field: 'user_id',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  parrentId: {
    field: 'parrent_id',
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  text: {
    field: 'text',
    type: DataTypes.STRING,
  },
  file: {
    field: 'file',
    type: DataTypes.STRING,
  },
  createdAt: {
    type: 'TIMESTAMP',
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
}, {
  tableName: 'comments',
  updatedAt: false,
})