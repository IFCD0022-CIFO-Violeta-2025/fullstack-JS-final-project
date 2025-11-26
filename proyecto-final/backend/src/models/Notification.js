import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dataBase/db.js";

class Notification extends Model {}

Notification.init(
  {
    idNotification: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    type: { type: DataTypes.STRING(20), allowNull: false },
    reference_id: { type: DataTypes.INTEGER, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
    is_read: { type: DataTypes.BOOLEAN, defaultValue: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: "Notifications",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: false,
  }
);

export default Notification;
