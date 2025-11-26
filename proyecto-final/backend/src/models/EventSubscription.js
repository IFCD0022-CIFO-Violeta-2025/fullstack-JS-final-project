import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dataBase/db.js";
import Event from "./Event.js";  
import User from "./User.js";  

class EventSubscription extends Model {}

EventSubscription.init(
  {
    idEvent: { type: DataTypes.INTEGER, primaryKey: true },
    idUser: { type: DataTypes.INTEGER, primaryKey: true },
    subscribedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: "EventSubscriptions",
    timestamps: false,
  }
);

// associations
Event.hasMany(EventSubscription, { foreignKey: "eventId" });
EventSubscription.belongsTo(Event, { foreignKey: "eventId" });

User.hasMany(EventSubscription, { foreignKey: "idUser" });
EventSubscription.belongsTo(User, { foreignKey: "idUser" });

export default EventSubscription;
