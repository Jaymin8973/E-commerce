import express from "express"
import {
  createProductType,
  getProductTypes,
  getProductTypeById,
  updateProductType,
  deleteProductType,
} from "../controllers/productType.controller.js";


const router = express.Router();

router.get("/", getProductTypes);
router.get("/:id", getProductTypeById);
router.post("/",   createProductType);
router.put("/:id",   updateProductType);
router.delete("/:id",   deleteProductType);

export default router;
