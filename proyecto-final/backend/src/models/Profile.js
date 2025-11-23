import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Profile = sequelize.define(
  "Profile",
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
  {
    tableName: "Profiles",
    timestamps: false, // No createdAt/updatedAt
  }
);

export default Profile;
