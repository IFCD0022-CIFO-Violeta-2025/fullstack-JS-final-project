import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Events = sequelize.define(
    "Events",
    {
      idEvent: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: DataTypes.STRING(255), allowNull: false },
      description: { type: DataTypes.TEXT },
      location: { type: DataTypes.STRING(255), allowNull: false },
      latitude: { type: DataTypes.FLOAT, allowNull: false },
      longitude: { type: DataTypes.FLOAT, allowNull: false },
      subscriptorsOnly: { type: DataTypes.BOOLEAN, defaultValue: false },
      visible: { type: DataTypes.BOOLEAN, defaultValue: false },
      archived: { type: DataTypes.BOOLEAN, defaultValue: false },
      deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
      start_time: { type: DataTypes.TIME, defaultValue: DataTypes.NOW },
      end_time: { type: DataTypes.TIME, defaultValue: DataTypes.NOW },
      start_date: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
      end_date: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
      reservationLastDate: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
      capacityMin: { type: DataTypes.INTEGER, allowNull: false },
      capacityMax: { type: DataTypes.INTEGER, allowNull: false },
      image_url: { type: DataTypes.STRING(255) },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      deleted_at: { type: DataTypes.DATE },
    },
    {
      tableName: "Events",
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      paranoid: true, // Usa deletedAt para borrado "suave"
      deletedAt: 'deleted_at'
    }
  );

  return Events;
};
