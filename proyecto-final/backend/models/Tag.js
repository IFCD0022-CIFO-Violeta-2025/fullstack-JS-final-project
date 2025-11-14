import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Tag = sequelize.define(
  "Tag",
  {
    idTag: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "Tags",
    timestamps: false, // no hay createdAt ni updatedAt en tu tabla
  }
);

export default Tag;
