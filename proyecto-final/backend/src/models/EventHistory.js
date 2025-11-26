import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dataBase/db.js";
import Event from "./Event.js";   // import Event model
import User from "./User.js";     // import User model if needed


class EventHistory extends Model {}

EventHistory.init(
  {
    idHistory: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    eventId: { type: DataTypes.INTEGER, allowNull: false },
    action: { type: DataTypes.STRING, allowNull: false },
    performedBy: { type: DataTypes.INTEGER, allowNull: true },
    snapshot: { type: DataTypes.JSON, allowNull: false },
    timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: "EventHistory",
    timestamps: false,
  }
);
// Associations
Event.hasMany(EventHistory, { foreignKey: "eventId" });
EventHistory.belongsTo(Event, { foreignKey: "eventId" });

User.hasMany(EventHistory, { foreignKey: "userId" });
EventHistory.belongsTo(User, { foreignKey: "userId" });

export default EventHistory;
