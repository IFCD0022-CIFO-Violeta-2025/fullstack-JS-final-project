import { DataTypes } from "sequelize";

export default (sequelize) => {
  const FAQs = sequelize.define(
    "FAQs",
    {
      idFAQ: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      textPregunta: { type: DataTypes.STRING(255), allowNull: false },
      textRespuesta: { type: DataTypes.STRING(255), allowNull: false },
    },
    {
      tableName: "FAQs",
      timestamps: false,
    }
  );

  return FAQs;
};