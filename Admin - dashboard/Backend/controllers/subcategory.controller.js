import Subcategory from "../models/subcategory.model.js";
import Category from "../models/category.model.js";
import slugify from "slugify";
import ProductType from "../models/productType.model.js";

export const createSubcategory = async (req, res) => {
  try {
    const { name, categoryId, description } = req.body;
    if (!name || !categoryId) return res.status(400).json({ message: "name and categoryId required" });

    const cat = await Category.findByPk(categoryId);
    if (!cat) return res.status(400).json({ message: "Invalid categoryId" });

    const slug = slugify ? slugify(name, { lower: true }) : name.toLowerCase().replace(/\s+/g, "-");

    const exists = await Subcategory.findOne({ where: { categoryId, slug } });
    if (exists) return res.status(400).json({ message: "Subcategory already exists for this category" });

    const sc = await Subcategory.create({ name, slug, categoryId, description });
    return res.status(201).json(sc);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

export const getSubcategories = async (req, res) => {
  try {
    const where = {};
    if (req.query.categoryId) where.categoryId = req.query.categoryId;

    const list = await Subcategory.findAll({ where, order: [["name", "ASC"]] });
    return res.json(list);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

export const getSubcategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const sc = await Subcategory.findByPk(id);
    if (!sc) return res.status(404).json({ message: "Not found" });
    return res.json(sc);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

export const updateSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, categoryId, description } = req.body;
    const sc = await Subcategory.findByPk(id);
    if (!sc) return res.status(404).json({ message: "Not found" });

    if (categoryId) {
      const cat = await Category.findByPk(categoryId);
      if (!cat) return res.status(400).json({ message: "Invalid categoryId" });
    }

    const slug = name ? (slugify ? slugify(name, { lower: true }) : name.toLowerCase().replace(/\s+/g, "-")) : sc.slug;

    await sc.update({
      name: name ?? sc.name,
      slug,
      categoryId: categoryId ?? sc.categoryId,
      description: description ?? sc.description,
    });

    return res.json(sc);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

export const deleteSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const sc = await Subcategory.findByPk(id);
    if (!sc) return res.status(404).json({ message: "Not found" });

    await sc.destroy();
    return res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};




export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();

    if (!categories.length) {
      return res.status(404).json({ message: "No categories found" });
    }

    return res.status(200).json(categories);
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

export const getSubCatOptions = async (req, res) => {

  const {categoryId} = req.body;
  try {
    const SubCategories = await Subcategory.findAll({
      where: {
        categoryId,
      }
    });

    if (!SubCategories.length) {
      return res.status(404).json();
    }

    return res.status(200).json(SubCategories);
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};