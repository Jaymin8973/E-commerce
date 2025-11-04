// controllers/product.controller.js
import fs from "fs";
import path from "path";
import { Op } from "sequelize";
import {
  Category,
  Gender,
  Product,
  ProductImage,
  ProductType,
  ProductVariant,
  sequelize,
  Subcategory,
} from "../models/index.js";
import ProductDetailAccessory from "../models/productDetailAccessory.model.js";
import ProductDetailClothing from "../models/productDetailClothing.model.js";
import ProductDetailFootwear from "../models/productDetailFootwear.model.js";


const fileUrl = (req, filename) => `${req.protocol}://${req.get("host")}/uploads/products/${filename}`;

/**
 * Helper - delete local file if exists
 */
const deleteLocalFile = (filename) => {
  try {
    const p = path.join("uploads/products", filename);
    if (fs.existsSync(p)) fs.unlinkSync(p);
  } catch (err) {
    console.error("Failed to delete file:", err);
  }
};

/**
 * Create Product
 * Accepts multipart/form-data with product fields and productImages files
 * expected fields:
 * - productTypeId, categoryId, subcategoryId, gender, productName, brand, shortDescription,
 *   mrp, sellingPrice, discountPercent, sku, hsnCode, totalStock, lowStockAlert,
 *   metaTitle, metaDescription, tags (comma string)
 * - variants: JSON stringified array [{ size, color, stock, price }, ...]
 * - clothing: JSON stringified object (if clothing)
 * - footwear: JSON stringified object (if footwear)
 * - accessory: JSON stringified object (if accessory)
 * Files key for images = "productImages" (multiple)
 */
export const createProduct = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    // parse body fields (numbers)
    const body = req.body;
    const productTypeRecord = await ProductType.findOne({ where: { name: body.productType } });
    const genderRecord = await Gender.findOne({ where: { gender: body.gender } });
    const categoryRecord = await Category.findOne({ where: { name: body.category } });
    const subcategoryRecord = await Subcategory.findOne({ where: { name: body.subcategory } });

    if (!productTypeRecord || !genderRecord || !categoryRecord || !subcategoryRecord) {
      return res.status(400).json({ message: "Invalid productType, gender, category, or subcategory name" });
    }
    // create product
    const product = await Product.create(
      {
        productTypeId: productTypeRecord.id,
        genderId: genderRecord.id,
        categoryId: categoryRecord.id,
        subcategoryId: subcategoryRecord.id,
        productName: body.productName,
        status: body.status,
        brand: body.brand,
        shortDescription: body.shortDescription,
        imageUrl: body.imageUrl || null, 
        mrp: parseFloat(body.mrp),
        sellingPrice: parseFloat(body.sellingPrice),
        discountPercent: body.discountPercent ? parseFloat(body.discountPercent) : null,
        sku: body.sku,
        hsnCode: body.hsnCode || null,
        totalStock: body.totalStock ? parseInt(body.totalStock) : 0,
        lowStockAlert: body.lowStockAlert ? parseInt(body.lowStockAlert) : 5,
        metaTitle: body.metaTitle || null,
        metaDescription: body.metaDescription || null,
        tags: body.tags || null,
      },
      { transaction: t }
    );

    // handle uploaded images
    if (req.files && req.files.length) {
      const images = req.files.map((f) => ({
        productId: product.id,
        imageUrl: fileUrl(req, f.filename),
      }));
      await ProductImage.bulkCreate(images, { transaction: t });
    }

    // variants
    if (body.variants) {
      const variants = typeof body.variants === "string" ? JSON.parse(body.variants) : body.variants;
      if (Array.isArray(variants) && variants.length) {
        const toCreate = variants.map((v) => ({
          productId: product.id,
          size: v.size,
          color: v.color,
          stock: v.stock,
          price: v.price,
        }));
        await ProductVariant.bulkCreate(toCreate, { transaction: t });
      }
    }

    // details (conditional)
    if (body.clothing) {
      const clothing = typeof body.clothing === "string" ? JSON.parse(body.clothing) : body.clothing;
      await ProductDetailClothing.create({ ...clothing, productId: product.id }, { transaction: t });
    }
    if (body.footwear) {
      const footwear = typeof body.footwear === "string" ? JSON.parse(body.footwear) : body.footwear;
      await ProductDetailFootwear.create({ ...footwear, productId: product.id }, { transaction: t });
    }
    if (body.accessory) {
      const accessory = typeof body.accessory === "string" ? JSON.parse(body.accessory) : body.accessory;
      await ProductDetailAccessory.create({ ...accessory, productId: product.id }, { transaction: t });
    }

    await t.commit();

    // return full product with relations
    const created = await Product.findByPk(product.id, {
      include: [ProductImage, ProductVariant, ProductDetailClothing, ProductDetailFootwear, ProductDetailAccessory],
    });
    return res.status(201).json({ product: created });
  } catch (err) {
    await t.rollback();
    console.error("createProduct error:", err);
    return res.status(500).json({ message: err.message });
  }
};

/**
 * List products with pagination, filtering, search
 * query params:
 * - page, limit, q (search by name/brand), productTypeId, categoryId, subcategoryId, minPrice, maxPrice
 */
export const listProducts = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 20);
    const offset = (page - 1) * limit;

    const where = {};
    if (req.query.productTypeId) where.productTypeId = req.query.productTypeId;
    if (req.query.categoryId) where.categoryId = req.query.categoryId;
    if (req.query.subcategoryId) where.subcategoryId = req.query.subcategoryId;
    if (req.query.minPrice) where.sellingPrice = { [Op.gte]: parseFloat(req.query.minPrice) };
    if (req.query.maxPrice) where.sellingPrice = { ...(where.sellingPrice || {}), [Op.lte]: parseFloat(req.query.maxPrice) };

    if (req.query.q) {
      const q = req.query.q.trim();
      where[Op.or] = [
        { productName: { [Op.like]: `%${q}%` } },
        { brand: { [Op.like]: `%${q}%` } },
      ];
    }

    const { count, rows } = await Product.findAndCountAll({
      where,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      include: [Category]
    });


    return res.json(rows);
  } catch (err) {
    console.error("listProducts error:", err);
    return res.status(500).json({ message: err.message });
  }
};

/**
 * Get product detail by id (with relations)
 */
export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id, {
      include: [Category,ProductImage, ProductVariant, ProductDetailClothing, ProductDetailFootwear, ProductDetailAccessory],
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.json(product);
  } catch (err) {
    console.error("getProductById error:", err);
    return res.status(500).json({ message: err.message });
  }
};

/**
 * Update product
 * Accepts multipart/form-data:
 * - any product fields to update
 * - productImages files for new images
 * - removeImageFilenames: JSON string array of filenames to delete disk & DB
 * - variants: JSON string array to replace existing variants (simple replace strategy)
 * - clothing/footwear/accessory: JSON string to upsert corresponding detail rows
 */
export const updateProduct = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const id = req.params.id;
    const body = req.body;
    const product = await Product.findByPk(id, { transaction: t });
    if (!product) {
      await t.rollback();
      return res.status(404).json({ message: "Product not found" });
    }

    // update product fields (only allow specific fields)
    const allowed = [
      "productTypeId",
      "categoryId",
      "subcategoryId",
      "gender",
      "productName",
      "brand",
      "shortDescription",
      "imageUrl",
      "mrp",
      "sellingPrice",
      "discountPercent",
      "sku",
      "hsnCode",
      "totalStock",
      "lowStockAlert",
      "metaTitle",
      "metaDescription",
      "tags",
    ];
    const updatePayload = {};
    for (const k of allowed) if (body[k] !== undefined) updatePayload[k] = body[k];
    if (Object.keys(updatePayload).length) await product.update(updatePayload, { transaction: t });

    // remove specific images if requested
    if (body.removeImageFilenames) {
      const toRemove = typeof body.removeImageFilenames === "string" ? JSON.parse(body.removeImageFilenames) : body.removeImageFilenames;
      if (Array.isArray(toRemove) && toRemove.length) {
        // delete rows DB and delete files
        const images = await ProductImage.findAll({ where: { productId: id }, transaction: t });
        for (const img of images) {
          const filename = path.basename(img.imageUrl);
          if (toRemove.includes(filename)) {
            await img.destroy({ transaction: t });
            deleteLocalFile(filename);
          }
        }
      }
    }

    // add newly uploaded files
    if (req.files && req.files.length) {
      const images = req.files.map((f) => ({ productId: id, imageUrl: fileUrl(req, f.filename) }));
      await ProductImage.bulkCreate(images, { transaction: t });
    }

    // replace variants if provided (simple approach: delete existing and create new)
    if (body.variants) {
      const variants = typeof body.variants === "string" ? JSON.parse(body.variants) : body.variants;
      if (Array.isArray(variants)) {
        await ProductVariant.destroy({ where: { productId: id }, transaction: t });
        const toCreate = variants.map((v) => ({ productId: id, size: v.size, color: v.color, stock: v.stock, price: v.price }));
        if (toCreate.length) await ProductVariant.bulkCreate(toCreate, { transaction: t });
      }
    }

    // upsert details (clothing/footwear/accessory)
    if (body.clothing) {
      const clothing = typeof body.clothing === "string" ? JSON.parse(body.clothing) : body.clothing;
      const existing = await ProductDetailClothing.findOne({ where: { productId: id }, transaction: t });
      if (existing) await existing.update(clothing, { transaction: t });
      else await ProductDetailClothing.create({ ...clothing, productId: id }, { transaction: t });
    }
    if (body.footwear) {
      const footwear = typeof body.footwear === "string" ? JSON.parse(body.footwear) : body.footwear;
      const existing = await ProductDetailFootwear.findOne({ where: { productId: id }, transaction: t });
      if (existing) await existing.update(footwear, { transaction: t });
      else await ProductDetailFootwear.create({ ...footwear, productId: id }, { transaction: t });
    }
    if (body.accessory) {
      const accessory = typeof body.accessory === "string" ? JSON.parse(body.accessory) : body.accessory;
      const existing = await ProductDetailAccessory.findOne({ where: { productId: id }, transaction: t });
      if (existing) await existing.update(accessory, { transaction: t });
      else await ProductDetailAccessory.create({ ...accessory, productId: id }, { transaction: t });
    }

    await t.commit();

    const updated = await Product.findByPk(id, {
      include: [ProductImage, ProductVariant, ProductDetailClothing, ProductDetailFootwear, ProductDetailAccessory],
    });
    return res.json({ product: updated });
  } catch (err) {
    await t.rollback();
    console.error("updateProduct error:", err);
    return res.status(500).json({ message: err.message });
  }
};

/**
 * Delete product (hard delete) - remove DB rows and image files
 */
export const deleteProduct = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id, { include: [ProductImage], transaction: t });
    if (!product) {
      await t.rollback();
      return res.status(404).json({ message: "Product not found" });
    }

    // delete images disk
    const images = product.ProductImages || product.productImages || []; // depending on include alias
    for (const img of images) {
      const filename = path.basename(img.imageUrl);
      deleteLocalFile(filename);
      await ProductImage.destroy({ where: { id: img.id }, transaction: t });
    }

    // product variants/detail rows will be cascaded if FK onDelete CASCADE
    await product.destroy({ transaction: t });

    await t.commit();
    return res.json({ message: "Product deleted" });
  } catch (err) {
    await t.rollback();
    console.error("deleteProduct error:", err);
    return res.status(500).json({ message: err.message });
  }
};
