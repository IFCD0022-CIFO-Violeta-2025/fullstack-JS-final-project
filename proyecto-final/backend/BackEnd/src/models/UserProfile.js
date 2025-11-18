import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dataBase/db.js";
class UserProfile extends Model {}
UserProfile.init(
  {
    idUser: { type: DataTypes.INTEGER, primaryKey: true },
    idProfile: { type: DataTypes.INTEGER, primaryKey: true },
  },
  { sequelize, tableName: "UserProfiles", timestamps: false }
);
export default UserProfile;
