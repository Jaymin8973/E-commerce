import ProductDetailFootwear from "../models/productDetailFootwear.model.js";

export const createFootwearDetail = async (req, res) => {
  try {
    const detail = await ProductDetailFootwear.create(req.body);
    res.status(201).json(detail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFootwearDetails = async (req, res) => {
  try {
    const details = await ProductDetailFootwear.findAll();
    res.json(details);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFootwearDetail = async (req, res) => {
  try {
    const detail = await ProductDetailFootwear.findByPk(req.params.id);
    if (!detail) return res.status(404).json({ error: "Footwear detail not found" });
    res.json(detail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateFootwearDetail = async (req, res) => {
  try {
    const detail = await ProductDetailFootwear.findByPk(req.params.id);
    if (!detail) return res.status(404).json({ error: "Footwear detail not found" });
    await detail.update(req.body);
    res.json(detail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteFootwearDetail = async (req, res) => {
  try {
    const deleted = await ProductDetailFootwear.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Footwear detail not found" });
    res.json({ message: "Footwear detail deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
