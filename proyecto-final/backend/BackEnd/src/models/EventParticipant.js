import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";
import User from "./User.js";
import Event from "./Event.js";

const EventParticipant = sequelize.define(
  "EventParticipant",
  {
    idEventParticipant: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    eventId: { type: DataTypes.INTEGER, allowNull: false },
    joinedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
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
