import { Router } from "express";
import { createReply, deleteReply, getRepliesByVideoId, updateReply } from "../controllers/Reply.js";

const router = Router();

router.post("/create/:remarkId", createReply);

router.put("/:id", updateReply);

router.get("/video/:videoId", getRepliesByVideoId);

router.delete("/delete/:id", deleteReply);

export default router;
