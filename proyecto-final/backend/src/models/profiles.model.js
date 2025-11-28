import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Profiles = sequelize.define(
    "Profiles",
    {
      idProfile: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      profileName: { type: DataTypes.STRING(255), allowNull: false },
    },
    {
      tableName: "Profiles",
      timestamps: false,
    }
  );

  return Profiles;
};