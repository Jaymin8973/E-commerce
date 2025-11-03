// models/productImage.model.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Product from "./Product.model.js";

const ProductImage = sequelize.define(
  "ProductImage",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    imageUrl: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: "product_images", timestamps: true }
);

export default ProductImage;
