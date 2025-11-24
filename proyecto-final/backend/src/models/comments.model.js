import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Comment = sequelize.define(
    'Comment',
    {
      idComment: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
      content: {type: DataTypes.TEXT,allowNull: false},
      borrado: {type: DataTypes.BOOLEAN,allowNull: false,defaultValue: false},
      created_at: {type: DataTypes.DATE,allowNull: false,defaultValue: DataTypes.NOW},
      updated_at: {type: DataTypes.DATE,allowNull: false,defaultValue: DataTypes.NOW},
      deleted_at: {type: DataTypes.DATE,allowNull: true}
    },
    {
      tableName: 'Comments',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      paranoid: true, // Usa deletedAt para borrado "suave"
      deletedAt: 'deleted_at'
    }
  );

  return Comment;
};
