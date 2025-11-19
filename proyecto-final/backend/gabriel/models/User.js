import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

//esto es sequilize desde aqui se crean los campos en la bbdd asi que no hay que crearlos manualmente en mysql
const User = sequelize.define(
  "User",
  {
    idUser: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    avatar_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    aboutMe: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    documentType: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    documentNumber: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    news_subscription: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    banned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    bannedDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    bannedUntilDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    // Sequelize ya maneja createdAt y updatedAt automáticamente si timestamps: true
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "Users", // nombre explícito de la tabla
    timestamps: true, // crea automáticamente createdAt y updatedAt
    paranoid: true, // soft delete, usa deleted_at
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: "deleted_at", // mapeo del soft delete
    indexes: [
      {
        name: "idx_users_document",
        fields: ["documentType", "documentNumber"],
      },
    ],
  }
);

export default User;

