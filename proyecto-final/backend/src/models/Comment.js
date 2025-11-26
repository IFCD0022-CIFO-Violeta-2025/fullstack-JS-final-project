import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dataBase/db.js";

class Comment extends Model {}

Comment.init(
  {
    idComment: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idUser: { type: DataTypes.INTEGER, allowNull: false },
    idEvent: { type: DataTypes.INTEGER },
    idPost: { type: DataTypes.INTEGER },
    content: { type: DataTypes.TEXT, allowNull: false },
    borrado: { type: DataTypes.BOOLEAN, defaultValue: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    deleted_at: { type: DataTypes.DATE },
  },
  {
    sequelize,
    tableName: "Comments",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

export default Comment;
