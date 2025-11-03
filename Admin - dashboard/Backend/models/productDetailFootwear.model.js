// models/productDetailFootwear.model.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Product from "./Product.model.js";

const ProductDetailFootwear = sequelize.define(
  "ProductDetailFootwear",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    heelHeight: DataTypes.STRING,
    soleMaterial: DataTypes.STRING,
    upperMaterial: DataTypes.STRING,
    closure: DataTypes.STRING,
  },
  { tableName: "product_detail_footwear", timestamps: true }
);

export default ProductDetailFootwear;
