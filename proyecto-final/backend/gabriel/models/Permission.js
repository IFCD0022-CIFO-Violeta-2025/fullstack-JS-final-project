import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Permission = sequelize.define(
  "Permission",
  {
    idPermission: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    permissionName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "Permissions",
    timestamps: false, // No createdAt/updatedAt
  }
);

export default Permission;
