import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Post = sequelize.define("Post", {
  idPost: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  idUser: { type: DataTypes.INTEGER, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  image_url: { type: DataTypes.STRING(255), allowNull: true },
  borrado: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  deleted_at: { type: DataTypes.DATE, allowNull: true },
}, {
  tableName: "Posts",
  timestamps: true,
  paranoid: true,
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  deletedAt: "deleted_at",
});

export default Post;
