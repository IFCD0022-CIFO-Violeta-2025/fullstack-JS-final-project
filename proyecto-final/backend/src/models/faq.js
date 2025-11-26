import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dataBase/db.js";

  class FAQ extends Model {}

  FAQ.init(
    {
      idFaq: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      question: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      answer: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "FAQ",
      tableName: "faq",
      timestamps: true,
    }
  );

  export default FAQ;

