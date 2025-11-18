import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dataBase/db.js";

class Tag extends Model {}

Tag.init(
  {
    idTag: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  },
  {
    sequelize,
    tableName: "Tags",
    timestamps: false,
  }
);

export default Tag;
