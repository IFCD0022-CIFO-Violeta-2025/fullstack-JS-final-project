import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Messages = sequelize.define(
    "Messages",
    {
      idMessage: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      content: { type: DataTypes.TEXT, allowNull: false },
      sent_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      is_read: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      tableName: "Messages",
      timestamps: false,
    }
  );

  return Messages;
};