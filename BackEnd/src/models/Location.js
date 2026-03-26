import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dataBase/db.js";

class Location extends Model {}

Location.init(
  {
    idLocation: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: { type: DataTypes.STRING(255) },
    locationMaps: { type: DataTypes.STRING(255), allowNull: false },
    deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    deleted_at: { type: DataTypes.DATE },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: "Locations",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

export default Location;
