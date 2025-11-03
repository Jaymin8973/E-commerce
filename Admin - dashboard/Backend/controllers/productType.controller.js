import ProductType from "../models/productType.model.js";
import slugify from "slugify"; 

export const createProductType = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: "name is required" });

    const slug = slugify ? slugify(name, { lower: true }) : name.toLowerCase().replace(/\s+/g, "-");

    const existing = await ProductType.findOne({ where: { slug } });
    if (existing) return res.status(400).json({ message: "ProductType already exists" });

    const pt = await ProductType.create({ name, description, slug });
    return res.status(201).json(pt);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

export const getProductTypes = async (req, res) => {
  try {
    const list = await ProductType.findAll({ order: [["createdAt", "DESC"]] });
    return res.json(list);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

export const getProductTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const pt = await ProductType.findByPk(id);
    if (!pt) return res.status(404).json({ message: "Not found" });
    return res.json(pt);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

export const updateProductType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const pt = await ProductType.findByPk(id);
    if (!pt) return res.status(404).json({ message: "Not found" });

    const slug = name ? (slugify ? slugify(name, { lower: true }) : name.toLowerCase().replace(/\s+/g, "-")) : pt.slug;

    await pt.update({ name: name ?? pt.name, description: description ?? pt.description, slug });
    return res.json(pt);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

export const deleteProductType = async (req, res) => {
  try {
    const { id } = req.params;
    const pt = await ProductType.findByPk(id);
    if (!pt) return res.status(404).json({ message: "Not found" });

    await pt.destroy();
    return res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
