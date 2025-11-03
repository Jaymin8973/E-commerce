import express from "express"
import {
  createSubcategory,
  getSubcategories,
  getSubcategoryById,
  updateSubcategory,
  deleteSubcategory,
  getMenSubcategories,
  getWomenSubcategories,
  getUnisexSubcategories,
  getAllCategories,
} from "../controllers/subcategory.controller.js";

const router = express.Router();

router.get("/", getAllCategories);
router.get("/men", getMenSubcategories);
router.get("/women", getWomenSubcategories);
router.get("/unisex", getUnisexSubcategories);
// admin protected
router.post("/",   createSubcategory);
router.get("/:id", getSubcategoryById);
router.put("/:id",   updateSubcategory);
router.delete("/:id",   deleteSubcategory);

export default router;
