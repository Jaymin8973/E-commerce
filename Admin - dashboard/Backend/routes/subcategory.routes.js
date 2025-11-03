import express from "express"
import {
  createSubcategory,
  getSubcategories,
  getSubcategoryById,
  updateSubcategory,
  deleteSubcategory,
  getAllCategories,
  getSubCatOptions,
} from "../controllers/subcategory.controller.js";

const router = express.Router();

router.get("/", getAllCategories);
router.post("/options", getSubCatOptions);

// admin protected
router.post("/",   createSubcategory);
router.get("/:id", getSubcategoryById);
router.put("/:id",   updateSubcategory);
router.delete("/:id",   deleteSubcategory);

export default router;
