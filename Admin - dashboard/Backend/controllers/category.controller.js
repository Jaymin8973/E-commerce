import Category from "../models/category.model.js";
import ProductType from "../models/productType.model.js";
import slugify from "slugify";

export const createCategory = async (req, res) => {
  try {
    const { name, productTypeId, description } = req.body;
    console.log(productTypeId)
    if (!name || !productTypeId) return res.status(400).json({ message: "name and productTypeId are required" });

    const pt = await ProductType.findByPk(productTypeId);
    if (!pt) return res.status(400).json({ message: "Invalid productTypeId" });

    const slug = slugify ? slugify(name, { lower: true }) : name.toLowerCase().replace(/\s+/g, "-");

    
    const exists = await Category.findOne({ where: { productTypeId, slug } });
    if (exists) return res.status(400).json({ message: "Category already exists for this product type" });

    const cat = await Category.create({ name, slug, productTypeId, description });
    return res.status(201).json(cat);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const where = {};
    if (req.query.productTypeId) where.productTypeId = req.query.productTypeId;

    const list = await Category.findAll({ where, order: [["name", "ASC"]] });
    return res.json(list);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const cat = await Category.findByPk(id);
    if (!cat) return res.status(404).json({ message: "Not found" });
    return res.json(cat);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, productTypeId, description } = req.body;
    const cat = await Category.findByPk(id);
    if (!cat) return res.status(404).json({ message: "Not found" });

    if (productTypeId) {
      const pt = await ProductType.findByPk(productTypeId);
      if (!pt) return res.status(400).json({ message: "Invalid productTypeId" });
    }

    const slug = name ? (slugify ? slugify(name, { lower: true }) : name.toLowerCase().replace(/\s+/g, "-")) : cat.slug;

    await cat.update({
      name: name ?? cat.name,
      slug,
      productTypeId: productTypeId ?? cat.productTypeId,
      description: description ?? cat.description,
    });

    return res.json(cat);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const cat = await Category.findByPk(id);
    if (!cat) return res.status(404).json({ message: "Not found" });

    await cat.destroy(); 
    return res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
