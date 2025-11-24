import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Organizers = sequelize.define(
    "Organizers",
    {
      idOrganizer: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      documentType: { type: DataTypes.STRING(10), allowNull: false },
      documentNumber: { type: DataTypes.STRING(15), allowNull: false },
      organizerName: { type: DataTypes.STRING(255), allowNull: false },
      organizerInfo: { type: DataTypes.TEXT },
    },
    {
      tableName: "Organizers",
      timestamps: false,
    }
  );

  return Organizers;
};