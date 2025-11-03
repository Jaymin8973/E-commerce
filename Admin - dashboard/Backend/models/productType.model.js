// models/productType.model.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ProductType = sequelize.define(
  "ProductType",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    slug: { type: DataTypes.STRING(120), allowNull: false }, 
  },
  {
    tableName: "product_types",
    timestamps: true,
  }
);

export default ProductType;
