import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Event from "./Event.js";
import Tag from "./Tag.js";

const EventTag = sequelize.define(
  "EventTag",
  {
    idEvent: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Event,
        key: "idEvent",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    idTag: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Tag,
        key: "idTag",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    tableName: "EventTags",
    timestamps: false, // no hay createdAt ni updatedAt
  }
);

export default EventTag;
