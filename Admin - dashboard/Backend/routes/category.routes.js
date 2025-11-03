import express from "express"
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  CategorybyOptions,
} from "../controllers/category.controller.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/options", CategorybyOptions);
router.get("/:id", getCategoryById);

// admin protected
router.post("/",   createCategory);
router.put("/:id",   updateCategory);
router.delete("/:id",   deleteCategory);


export default router;
