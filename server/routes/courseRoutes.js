import express from "express";
import { getCourses, createCourse, getCourseBySlug, getCourseById, updateCourse, deleteCourse, togglePublishCourse, getUserSubscribedCourses, getCourseByUserId } from "../controllers/course.js";
import upload from "../middlewares/multer-config.js";

const router = express.Router();

router.get("/", getCourses);

router.post("/create", upload.single("image"), createCourse);

router.get("/my-courses", getUserSubscribedCourses);

router.get("/:id", getCourseByUserId);

router.get("/get-course-by-id/:id", getCourseById);

router.put("/:id/publish", togglePublishCourse);

router.put("/update/:id", upload.single("image"), updateCourse);

router.get("/slug/:slug", getCourseBySlug);

router.delete("/delete/:id", deleteCourse);

export default router;
