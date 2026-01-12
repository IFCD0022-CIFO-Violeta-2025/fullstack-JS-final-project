import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Users = sequelize.define(
    "Users",
    {
      idUser: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      UUID: { type: DataTypes.STRING(50), allowNull: false },
      username: { type: DataTypes.STRING(20), allowNull: false },
      name: { type: DataTypes.STRING(50), allowNull: true },
      lastName: { type: DataTypes.STRING(50), allowNull: true },
      email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
      telefono: { type: DataTypes.STRING(20) },
      clave: { type: DataTypes.STRING(100), allowNull: false },
      avatar_url: { type: DataTypes.STRING(255) },
      aboutMe: { type: DataTypes.TEXT },
      address: { type: DataTypes.STRING(255) },
      birthday: { type: DataTypes.DATE },
      documentType: { type: DataTypes.STRING(10) },
      documentNumber: { type: DataTypes.STRING(15) },
      reminders: { type: DataTypes.BOOLEAN, defaultValue: false },
      news_subscription: { type: DataTypes.BOOLEAN, defaultValue: false },
      banned: { type: DataTypes.BOOLEAN, defaultValue: false },
      banned_date: { type: DataTypes.DATE },
      bannedUntilDate: { type: DataTypes.DATE },
      confirmation_token: { type: DataTypes.STRING(50) },
      confirmation_ok: { type: DataTypes.BOOLEAN, defaultValue: false },
      deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      deleted_at: { type: DataTypes.DATE },
    },
    {
      tableName: "Users",
      timestamps: false,
    }
  );

  return Users;
};
