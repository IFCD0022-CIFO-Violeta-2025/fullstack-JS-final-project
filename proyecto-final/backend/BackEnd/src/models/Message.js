import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dataBase/db.js";

class Message extends Model {}

Message.init(
  {
    idMessage: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idSender: { type: DataTypes.INTEGER, allowNull: false },
    idReceiver: { type: DataTypes.INTEGER, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    sentAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    is_read: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    sequelize,
    tableName: "Messages",
    timestamps: false,
  }
);

export default Message;
