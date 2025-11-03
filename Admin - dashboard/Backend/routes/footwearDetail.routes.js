import express from "express";
import {
  createFootwearDetail,
  getFootwearDetails,
  getFootwearDetail,
  updateFootwearDetail,
  deleteFootwearDetail,
} from "../controllers/footwearDetail.controller.js";

const router = express.Router();

router.post("/", createFootwearDetail);
router.get("/", getFootwearDetails);
router.get("/:id", getFootwearDetail);
router.put("/:id", updateFootwearDetail);
router.delete("/:id", deleteFootwearDetail);

export default router;
