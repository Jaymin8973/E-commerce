// models/subcategory.model.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Category from "./category.model.js";

const Subcategory = sequelize.define(
  "Subcategory",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    slug: { type: DataTypes.STRING(120), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    tableName: "subcategories",
    timestamps: true,
    indexes: [{ unique: true, fields: ["categoryId", "slug"] }],
  }
);

export default Subcategory;
