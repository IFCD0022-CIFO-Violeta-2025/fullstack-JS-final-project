import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dataBase/db.js";


class UserHistory  extends Model {}

  UserHistory.init( {
    
  idHistory: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  action: { type: DataTypes.STRING, allowNull: false }, // 'blocked', 'deleted', 'updated'
  performedBy: { type: DataTypes.INTEGER, allowNull: true }, // adminId
  snapshot: { type: DataTypes.JSON, allowNull: false }, // стан користувача на момент дії
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  sequelize,
  tableName: 'UserHistory',
  timestamps: false
});

export default UserHistory;
