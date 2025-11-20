import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Relation = sequelize.define(
  "Relation",
  {
    idRelation: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idEntidad1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idEntidad2: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    relationName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    relationType: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "Relations",
    timestamps: true,
    paranoid: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: "deleted_at",
  }
);

export default Relation;
