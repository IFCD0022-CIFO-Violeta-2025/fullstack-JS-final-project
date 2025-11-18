import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dataBase/db.js";

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

export default EventSubscription;
