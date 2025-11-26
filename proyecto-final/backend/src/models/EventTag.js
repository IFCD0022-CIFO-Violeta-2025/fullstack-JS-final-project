import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dataBase/db.js";

class EventTag extends Model {}

EventTag.init(
  {
    idEvent: { type: DataTypes.INTEGER, primaryKey: true },
    idTag: { type: DataTypes.INTEGER, primaryKey: true },
  },
  {
    sequelize,
    tableName: "EventTags",
    timestamps: false,
  }
);

export default EventTag;
