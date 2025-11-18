import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dataBase/db.js";

class Post extends Model {}

Post.init(
  {
    idPost: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    idUser: { type: DataTypes.INTEGER, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    image_url: { type: DataTypes.STRING(255) },
    borrado: { type: DataTypes.BOOLEAN, defaultValue: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    deleted_at: { type: DataTypes.DATE },
  },
  {
    sequelize,
    tableName: "Posts",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

export default Post;
