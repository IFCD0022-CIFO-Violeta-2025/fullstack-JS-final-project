import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Notifications = sequelize.define(
    "Notifications",
    {
      idNotification: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      type: { type: DataTypes.STRING(20), allowNull: false },
      reference_id: { type: DataTypes.INTEGER, allowNull: false },
      message: { type: DataTypes.TEXT, allowNull: false },
      is_read: { type: DataTypes.BOOLEAN, defaultValue: false },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      tableName: "Notifications",
      timestamps: false,
    }
  );

  return Notifications;
};