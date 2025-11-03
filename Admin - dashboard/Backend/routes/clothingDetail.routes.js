import express from "express";
import {
  createClothingDetail,
  getClothingDetails,
  getClothingDetail,
  updateClothingDetail,
  deleteClothingDetail,
} from "../controllers/clothingDetail.controller.js";

const router = express.Router();

router.post("/", createClothingDetail);
router.get("/", getClothingDetails);
router.get("/:id", getClothingDetail);
router.put("/:id", updateClothingDetail);
router.delete("/:id", deleteClothingDetail);

export default router;
