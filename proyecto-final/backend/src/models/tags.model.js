import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Tags = sequelize.define(
    "Tags",
    {
      idTag: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING(50), allowNull: false },
    },
    {
      tableName: "Tags",
      timestamps: false,
    }
  );

  return Tags;
};