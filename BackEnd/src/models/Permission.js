import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dataBase/db.js";
class Permission extends Model {}
Permission.init(
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
  { sequelize, tableName: "Permissions", timestamps: false }
);
export default Permission;
