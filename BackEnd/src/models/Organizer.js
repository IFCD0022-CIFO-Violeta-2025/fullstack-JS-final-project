import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dataBase/db.js";

class Organizer extends Model {}

Organizer.init(
  {
    idOrganizer: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    documentType: { type: DataTypes.STRING(20), allowNull: false },
    documentNumber: { type: DataTypes.STRING(15), allowNull: false },
    organizerName: { type: DataTypes.STRING(255), allowNull: false },
    organizerInfo: { type: DataTypes.STRING(255) },
  },
  {
    sequelize,
    tableName: "Organizers",
    timestamps: false,
  }
);

export default Organizer;
