import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Permission = sequelize.define(
    'Permission',
    {
      idPermission: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      permissionName: {
        type: DataTypes.STRING(255),
        allowNull: false
      }
    },
    {
      tableName: 'Permissions',
      timestamps: false
    }
  );

  return Permission;
};
