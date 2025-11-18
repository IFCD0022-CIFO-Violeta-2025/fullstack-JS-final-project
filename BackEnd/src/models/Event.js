import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dataBase/db.js";

class Event extends Model {}

Event.init(
  {
    idEvent: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    idOrganizer: { type: DataTypes.INTEGER },
    idLocation: { type: DataTypes.INTEGER },
    title: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT },
    location: { type: DataTypes.STRING(255), allowNull: false },
    subscriptorsOnly: { type: DataTypes.BOOLEAN, defaultValue: false },
    visible: { type: DataTypes.BOOLEAN, defaultValue: false },
    archived: { type: DataTypes.BOOLEAN, defaultValue: false },
    deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    startTime: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    endTime: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    reservationLastDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    capacity: { type: DataTypes.INTEGER, allowNull: false },
    image_url: { type: DataTypes.STRING(255) },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    latitude: { type: DataTypes.FLOAT, allowNull: false },
    longitude: { type: DataTypes.FLOAT, allowNull: false },
    deleted_at: { type: DataTypes.DATE },
  },
  {
    sequelize,
    tableName: "Events",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

export default Event;
