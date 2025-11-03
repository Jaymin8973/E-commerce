import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Gender = sequelize.define(
  "Gender",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    gender: { type: DataTypes.ENUM("Men", "Women", "Unisex"),allowNull: false },
  }
);


export default Gender;