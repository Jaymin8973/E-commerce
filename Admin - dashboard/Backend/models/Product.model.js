// models/product.model.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Category from "./category.model.js";
import Subcategory from "./subcategory.model.js";
import ProductType from "./productType.model.js";

const Product = sequelize.define(
  "Product",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    productName: { type: DataTypes.STRING(150), allowNull: false },
    brand: { type: DataTypes.STRING(100), allowNull: false },
    shortDescription: { type: DataTypes.TEXT },
    status: { type: DataTypes.ENUM("active", "draft" , "inactive"), defaultValue: "active" },
    imageUrl: { type: DataTypes.STRING },
    mrp: { type: DataTypes.FLOAT, allowNull: false },
    sellingPrice: { type: DataTypes.FLOAT, allowNull: false },
    discountPercent: { type: DataTypes.FLOAT },
    sku: { type: DataTypes.STRING(100), allowNull: false},
    hsnCode: { type: DataTypes.STRING(50) },
    totalStock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    lowStockAlert: { type: DataTypes.INTEGER, defaultValue: 5 },
    metaTitle: { type: DataTypes.STRING(160) },
    metaDescription: { type: DataTypes.STRING(255) },
    tags: { type: DataTypes.STRING },
    productTypeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    subcategoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "products",
    timestamps: true,
  }
);

export default Product;
