import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dataBase/db.js";

class ProfilePermission extends Model {}
ProfilePermission.init(
  {
    idProfile: { type: DataTypes.INTEGER, primaryKey: true },
    idPermission: { type: DataTypes.INTEGER, primaryKey: true },
  },
  { sequelize, tableName: "ProfilePermissions", timestamps: false }
);
export default ProfilePermission;
