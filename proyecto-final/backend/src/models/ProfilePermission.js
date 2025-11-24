import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ProfilePermission = sequelize.define("ProfilePermission", {
  idProfile: { type: DataTypes.INTEGER, primaryKey: true },
  idPermission: { type: DataTypes.INTEGER, primaryKey: true },
}, {
  tableName: "ProfilePermissions",
  timestamps: false,
});

export default ProfilePermission;
