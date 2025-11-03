import ProductDetailAccessory from "../models/productDetailAccessory.model.js";

export const createAccessoryDetail = async (req, res) => {
  try {
    const detail = await ProductDetailAccessory.create(req.body);
    res.status(201).json(detail);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAccessoryDetails = async (req, res) => {
  const details = await ProductDetailAccessory.findAll();
  res.json(details);
};

export const getAccessoryDetail = async (req, res) => {
  const detail = await ProductDetailAccessory.findByPk(req.params.id);
  detail ? res.json(detail) : res.status(404).json({ error: "Not found" });
};

export const updateAccessoryDetail = async (req, res) => {
  const detail = await ProductDetailAccessory.findByPk(req.params.id);
  if (!detail) return res.status(404).json({ error: "Not found" });
  await detail.update(req.body);
  res.json(detail);
};

export const deleteAccessoryDetail = async (req, res) => {
  const deleted = await ProductDetailAccessory.destroy({ where: { id: req.params.id } });
  deleted ? res.json({ message: "Deleted" }) : res.status(404).json({ error: "Not found" });
};
