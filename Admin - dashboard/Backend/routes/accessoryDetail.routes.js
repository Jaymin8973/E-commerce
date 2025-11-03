import express from "express";
import {
  createAccessoryDetail,
  getAccessoryDetails,
  getAccessoryDetail,
  updateAccessoryDetail,
  deleteAccessoryDetail
} from "../controllers/accessoryDetail.controller.js";

const router = express.Router();

router.post("/", createAccessoryDetail);
router.get("/", getAccessoryDetails);
router.get("/:id", getAccessoryDetail);
router.put("/:id", updateAccessoryDetail);
router.delete("/:id", deleteAccessoryDetail);

export default router;
