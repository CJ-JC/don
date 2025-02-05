import { Router } from "express";
import { createRemark, deleteRemark, getRemarksByVideoId, updateRemark } from "../controllers/remark.js";

const router = Router();

router.post("/create", createRemark);

router.put("/:id", updateRemark);

router.get("/video/:videoId", getRemarksByVideoId);

router.delete("/delete/:id", deleteRemark);

export default router;
