// models/productDetailAccessory.model.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Product from "./Product.model.js";

const ProductDetailAccessory = sequelize.define(
  "ProductDetailAccessory",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    accessoryType: DataTypes.STRING,
    dimensions: DataTypes.STRING,
    weight: DataTypes.FLOAT,
  },
  { tableName: "product_detail_accessory", timestamps: true }
);

export default ProductDetailAccessory;
