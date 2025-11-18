import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";

const EventHistory = sequelize.define(
  "EventHistory",
  {
    idHistory: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    eventId: { type: DataTypes.INTEGER, allowNull: false },
    action: { type: DataTypes.STRING, allowNull: false }, // 'created', 'updated', 'deleted', 'republished'
    performedBy: { type: DataTypes.INTEGER, allowNull: false }, // admin/moderator ID
    snapshot: { type: DataTypes.JSON, allowNull: false }, // стан події на момент дії
    timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "EventHistory",
    timestamps: false,
  }
);

export default EventHistory;
