import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import { sequelize } from "./models/index.js";

// Routes
import productTypeRoutes from "./routes/productType.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import subcategoryRoutes from "./routes/subcategory.routes.js";
import productRoutes from "./routes/product.routes.js";
import accessoryRoutes from "./routes/accessoryDetail.routes.js";
import footwearRoutes from "./routes/footwearDetail.routes.js";
import clothingRoutes from "./routes/clothingDetail.routes.js";
import variantRoutes from "./routes/productVariant.routes.js";
import imageRoutes from "./routes/productImage.routes.js";
import genderRoutes from "./routes/gender.routes.js";


import cloudinary from "cloudinary";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Cloudinary Config (Free Cloud Storage)
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Base Routes
app.use("/product-types", productTypeRoutes);
app.use("/categories", categoryRoutes);
app.use("/subcategories", subcategoryRoutes);
app.use("/products", productRoutes);
app.use("/accessory-details", accessoryRoutes);
app.use("/footwear-details", footwearRoutes);
app.use("/clothing-details", clothingRoutes);
app.use("/product-variants", variantRoutes);
app.use("/product-images", imageRoutes);
app.use('/genders', genderRoutes);

//  Health Check Route
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// Sync Database
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ MySQL Connected Successfully");
    return sequelize.sync({ alter: true }); // keeps schema updated
  })
  .then(() => console.log("✅ Models Synced"))
  .catch((err) => console.error("❌ Database Error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
