import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const UserProfile = sequelize.define("UserProfile", {
  idUser: { type: DataTypes.INTEGER, primaryKey: true },
  idProfile: { type: DataTypes.INTEGER, primaryKey: true },
}, {
  tableName: "UserProfiles",
  timestamps: false,
});

export default UserProfile;
