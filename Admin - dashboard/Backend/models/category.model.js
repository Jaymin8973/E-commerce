// models/category.model.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import ProductType from "./productType.model.js";

const Category = sequelize.define(
  "Category",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    slug: { type: DataTypes.STRING(120), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    tableName: "categories",
    timestamps: true,
    indexes: [{ fields: ["productTypeId", "slug"] }], 
  }
);


export default Category;
