import { DataTypes } from "sequelize";
import { sequelize } from "../postgres.connection.js";
import { Users } from "./users.model.js";

export const Contacts = sequelize.define(
  "contacts",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Users,
        key: "id",
      },
    },
    marked_spam: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    hooks: {
      afterCreate: (instance, _) => {
        if (instance.created_by == null) {
          return instance.update({ created_by: instance.id });
        }
      },
    },
  }
);
