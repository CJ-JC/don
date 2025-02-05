import express from "express";
import { updateUserProgress, upsertUserProgress, getVideoProgress, getUserCourseProgress, deleteCourseProgress } from "../controllers/userProgress.js";

const router = express.Router();

router.get("/:courseId", getUserCourseProgress);

router.post("/create", upsertUserProgress);

router.post("/edit/:chapterId", updateUserProgress);

router.get("/video/:videoId", getVideoProgress);

router.delete("/course/:courseId", deleteCourseProgress);

export default router;
