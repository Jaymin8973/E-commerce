// models/productDetailClothing.model.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Product from "./Product.model.js";

const ProductDetailClothing = sequelize.define(
  "ProductDetailClothing",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    material: DataTypes.STRING,
    fabric: DataTypes.STRING,
    pattern: DataTypes.STRING,
    collarType: DataTypes.STRING,
    fit: DataTypes.STRING,
    occasion: DataTypes.STRING,
    season: DataTypes.STRING,
    careInstruction: DataTypes.TEXT,
  },
  { tableName: "product_detail_clothing", timestamps: true }
);

export default ProductDetailClothing;
