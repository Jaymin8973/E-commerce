import ProductVariant from "../models/productVariant.model.js";

export const createProductVariant = async (req, res) => {
  try {
    const variant = await ProductVariant.create(req.body);
    res.status(201).json(variant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductVariants = async (req, res) => {
  try {
    const variants = await ProductVariant.findAll();
    res.json(variants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductVariant = async (req, res) => {
  try {
    const variant = await ProductVariant.findByPk(req.params.id);
    if (!variant) return res.status(404).json({ error: "Variant not found" });
    res.json(variant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProductVariant = async (req, res) => {
  try {
    const variant = await ProductVariant.findByPk(req.params.id);
    if (!variant) return res.status(404).json({ error: "Variant not found" });
    await variant.update(req.body);
    res.json(variant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProductVariant = async (req, res) => {
  try {
    const deleted = await ProductVariant.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Variant not found" });
    res.json({ message: "Variant deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
