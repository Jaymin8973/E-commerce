import express from "express";
import {
  createProductVariant,
  getProductVariants,
  getProductVariant,
  updateProductVariant,
  deleteProductVariant,
} from "../controllers/productVariant.controller.js";

const router = express.Router();

router.post("/", createProductVariant);
router.get("/", getProductVariants);
router.get("/:id", getProductVariant);
router.put("/:id", updateProductVariant);
router.delete("/:id", deleteProductVariant);

export default router;
