import sequelize from "../config/db.js";

// ---- Import all models ----
import ProductType from "./productType.model.js";
import Gender from "./gender.model.js";
import Category from "./category.model.js";
import Subcategory from "./subcategory.model.js";
import Product from "./Product.model.js";
import ProductImage from "./productImage.model.js";
import ProductVariant from "./productVariant.model.js";
import ClothingDetail from "./productDetailClothing.model.js";
import FootwearDetail from "./productDetailFootwear.model.js";
import AccessoryDetail from "./productDetailAccessory.model.js";

// -------------------------------------------------------------
// 🔗 Define Associations
// -------------------------------------------------------------

// 1️⃣ ProductType ↔ Category
ProductType.hasMany(Category, { foreignKey: "productTypeId", onDelete: "CASCADE" });
Category.belongsTo(ProductType, { foreignKey: "productTypeId" });

// 2️⃣ Gender ↔ Category
Gender.hasMany(Category, { foreignKey: "genderId", onDelete: "CASCADE" });
Category.belongsTo(Gender, { foreignKey: "genderId" });

// 3️⃣ Category ↔ Subcategory
Category.hasMany(Subcategory, { foreignKey: "categoryId", onDelete: "CASCADE" });
Subcategory.belongsTo(Category, { foreignKey: "categoryId" });

// 4️⃣ ProductType ↔ Product
ProductType.hasMany(Product, { foreignKey: "productTypeId", onDelete: "SET NULL" });
Product.belongsTo(ProductType, { foreignKey: "productTypeId" });

// 5️⃣ Gender ↔ Product
Gender.hasMany(Product, { foreignKey: "genderId", onDelete: "SET NULL" });
Product.belongsTo(Gender, { foreignKey: "genderId" });

// 6️⃣ Category ↔ Product
Category.hasMany(Product, { foreignKey: "categoryId", onDelete: "SET NULL" });
Product.belongsTo(Category, { foreignKey: "categoryId" });

// 7️⃣ Subcategory ↔ Product
Subcategory.hasMany(Product, { foreignKey: "subcategoryId", onDelete: "SET NULL" });
Product.belongsTo(Subcategory, { foreignKey: "subcategoryId" });

// 8️⃣ Product ↔ ProductImage
Product.hasMany(ProductImage, { foreignKey: "productId", onDelete: "CASCADE" });
ProductImage.belongsTo(Product, { foreignKey: "productId" });

// 9️⃣ Product ↔ ProductVariant
Product.hasMany(ProductVariant, { foreignKey: "productId", onDelete: "CASCADE" });
ProductVariant.belongsTo(Product, { foreignKey: "productId" });

// 🔟 Product ↔ ClothingDetail
Product.hasOne(ClothingDetail, { foreignKey: "productId", onDelete: "CASCADE" });
ClothingDetail.belongsTo(Product, { foreignKey: "productId" });

// 1️⃣1️⃣ Product ↔ FootwearDetail
Product.hasOne(FootwearDetail, { foreignKey: "productId", onDelete: "CASCADE" });
FootwearDetail.belongsTo(Product, { foreignKey: "productId" });

// 1️⃣2️⃣ Product ↔ AccessoryDetail
Product.hasOne(AccessoryDetail, { foreignKey: "productId", onDelete: "CASCADE" });
AccessoryDetail.belongsTo(Product, { foreignKey: "productId" });

// -------------------------------------------------------------
// 🧱 Sync all models
// -------------------------------------------------------------
await sequelize.sync({ alter: true });
console.log("✅ All models synced successfully");

// -------------------------------------------------------------
// 📦 Export all
// -------------------------------------------------------------
export {
  sequelize,
  ProductType,
  Gender,
  Category,
  Subcategory,
  Product,
  ProductImage,
  ProductVariant,
  ClothingDetail,
  FootwearDetail,
  AccessoryDetail,
};
