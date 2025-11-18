import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dataBase/db.js";
class Profile extends Model {}
Profile.init(
  {
    idProfile: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    profileName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
  },
  { sequelize, tableName: "Profiles", timestamps: false }
);
export default Profile;
