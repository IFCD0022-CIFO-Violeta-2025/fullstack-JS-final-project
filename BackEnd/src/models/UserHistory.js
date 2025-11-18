import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";

const UserHistory = sequelize.define(
  "UserHistory",
  {
    idHistory: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    action: { type: DataTypes.STRING, allowNull: false }, // 'blocked', 'deleted', 'updated'
    performedBy: {
  type: DataTypes.INTEGER,
  allowNull: true,
  references: {
    model: "Users",
    key: "idUser"
  },
  onDelete: "SET NULL"
}, // adminId
    snapshot: { type: DataTypes.JSON, allowNull: false }, // стан користувача на момент дії
    timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "UserHistory",
    timestamps: false,
  }
);

export default UserHistory;
