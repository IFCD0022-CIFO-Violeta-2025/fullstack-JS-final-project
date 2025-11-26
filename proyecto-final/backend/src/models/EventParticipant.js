import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dataBase/db.js";
import User from "./User.js";
import Event from "./Event.js";

class EventParticipant extends Model {}
  EventParticipant.init(
  {
     idEventParticipant: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
     userId: { type: DataTypes.INTEGER, allowNull: false },
    eventId: { type: DataTypes.INTEGER, allowNull: false },
    joinedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: "EventParticipants",
    timestamps: false,
  }
);

// Associations (якщо ще не визначені)
Event.hasMany(EventParticipant, { foreignKey: "eventId" });
EventParticipant.belongsTo(Event, { foreignKey: "eventId" });

User.hasMany(EventParticipant, { foreignKey: "userId" });
EventParticipant.belongsTo(User, { foreignKey: "userId" });

export default EventParticipant;
