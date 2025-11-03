import ProductImage from "../models/productImage.model.js";

export const createProductImage = async (req, res) => {
  try {
    const image = await ProductImage.create(req.body);
    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductImages = async (req, res) => {
  try {
    const images = await ProductImage.findAll();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductImage = async (req, res) => {
  try {
    const image = await ProductImage.findByPk(req.params.id);
    if (!image) return res.status(404).json({ error: "Image not found" });
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProductImage = async (req, res) => {
  try {
    const image = await ProductImage.findByPk(req.params.id);
    if (!image) return res.status(404).json({ error: "Image not found" });
    await image.update(req.body);
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProductImage = async (req, res) => {
  try {
    const deleted = await ProductImage.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Image not found" });
    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
