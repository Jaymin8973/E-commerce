// routes/product.routes.js
import express from "express";
import {
  createProduct,
  listProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  uploadBulkProducts,
} from "../controllers/product.controller.js";
// import { upload } from "../middleware/upload.middleware.js";
import multer from "multer";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Public read endpoints
router.get("/", listProducts); // supports ?page=&limit=&q=&productTypeId=&categoryId=&minPrice=&maxPrice=
router.get("/:id", getProductById);

// Protected admin endpoints
router.post("/", upload.array("productImages", 8), createProduct);
router.post("/bulk", upload.single("file"), uploadBulkProducts);
router.put("/:id", upload.array("productImages", 8), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
