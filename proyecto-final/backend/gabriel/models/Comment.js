import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Comment = sequelize.define("Comment", {
  idComment: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  idUser: { type: DataTypes.INTEGER, allowNull: false },
  idEvent: { type: DataTypes.INTEGER, allowNull: true },
  idPost: { type: DataTypes.INTEGER, allowNull: true },
  content: { type: DataTypes.TEXT, allowNull: false },
  borrado: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  deleted_at: { type: DataTypes.DATE, allowNull: true },
}, {
  tableName: "Comments",
  timestamps: true,
  paranoid: true,
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  deletedAt: "deleted_at",
});

export default Comment;
