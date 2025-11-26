import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dataBase/db.js";

class User extends Model {}

User.init(
  {
    idUser: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    name: { type: DataTypes.STRING(50), allowNull: false },
    lastName: { type: DataTypes.STRING(50), allowNull: false },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(255), allowNull: false },
    avatar_url: { type: DataTypes.STRING(255) },
    aboutMe: { type: DataTypes.TEXT },
    address: { type: DataTypes.STRING(255) },
    birthday: { type: DataTypes.DATE },
    documentType: { type: DataTypes.STRING(10), allowNull: false },
    documentNumber: { type: DataTypes.STRING(15), allowNull: false },
    news_subscription: { type: DataTypes.BOOLEAN, defaultValue: false },
    banned: { type: DataTypes.BOOLEAN, defaultValue: false },
    bannedDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    bannedUntilDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    deletedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: "Users",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    paranoid: true, 
    deletedAt: "deletedAt",
  }
);

export default User;
