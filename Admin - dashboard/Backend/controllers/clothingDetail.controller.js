import ProductDetailClothing from "../models/productDetailClothing.model.js";

export const createClothingDetail = async (req, res) => {
  try {
    const detail = await ProductDetailClothing.create(req.body);
    res.status(201).json(detail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getClothingDetails = async (req, res) => {
  try {
    const details = await ProductDetailClothing.findAll();
    res.json(details);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getClothingDetail = async (req, res) => {
  try {
    const detail = await ProductDetailClothing.findByPk(req.params.id);
    if (!detail) return res.status(404).json({ error: "Clothing detail not found" });
    res.json(detail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateClothingDetail = async (req, res) => {
  try {
    const detail = await ProductDetailClothing.findByPk(req.params.id);
    if (!detail) return res.status(404).json({ error: "Clothing detail not found" });
    await detail.update(req.body);
    res.json(detail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteClothingDetail = async (req, res) => {
  try {
    const deleted = await ProductDetailClothing.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Clothing detail not found" });
    res.json({ message: "Clothing detail deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
