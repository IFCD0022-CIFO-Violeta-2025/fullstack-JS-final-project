import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Organizer = sequelize.define("Organizer", {
  idOrganizer: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  documentType: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  documentNumber: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  organizerName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  organizerInfo: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  tableName: "Organizers",
  timestamps: false, // Si no quieres createdAt/updatedAt
    indexes: [
    {
      unique: true,
      fields: ["documentType", "documentNumber"],
      name: "ux_organizers_document"
    }
  ]
});

export default Organizer;
