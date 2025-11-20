import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Message = sequelize.define("Message", {
  idMessage: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  idSender: { type: DataTypes.INTEGER, allowNull: false },
  idReceiver: { type: DataTypes.INTEGER, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  sentAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  is_read: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
}, {
  tableName: "Messages",
  timestamps: false,
});

export default Message;
