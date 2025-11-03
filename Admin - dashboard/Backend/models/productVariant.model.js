// models/productVariant.model.js
import { DataTypes } from"sequelize";
import sequelize from "../config/db.js";
import Product from "./Product.model.js";

const ProductVariant = sequelize.define(
  "ProductVariant",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    size: { type: DataTypes.STRING(50) },
    color: { type: DataTypes.STRING(50) },
    stock: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
  },
  { tableName: "product_variants", timestamps: true }
);

export default ProductVariant;
