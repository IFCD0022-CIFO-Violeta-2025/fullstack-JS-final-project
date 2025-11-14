import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

//esto es sequilize desde aqui se crean los campos en la bbdd asi que no hay que crearlos manualmente en mysql
const User = sequelize.define(
  "User",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"), // define los roles posibles como checkbox en mysql
      allowNull: false,
      defaultValue: "user", // por defecto usuario normal
    },
  },
  {
    timestamps: true, // crea automáticamente createdAt y updatedAt
    paranoid: true, //soft deleted para no eliminar 
  }
);

export default User;
