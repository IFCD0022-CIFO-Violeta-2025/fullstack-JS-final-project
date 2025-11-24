import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Location = sequelize.define(
  "Location",
  {
    idLocation: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    locationMaps: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    // Sequelize manejará createdAt y updatedAt automáticamente
  },
  {
    tableName: "Locations", // nombre explícito de la tabla
    timestamps: true,       // crea automáticamente createdAt y updatedAt
    paranoid: true,         // habilita soft delete usando deleted_at
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: "deleted_at", // mapea soft delete al campo deleted_at
  }
);

export default Location;
