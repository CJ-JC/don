import { Router } from "express";
import { createNote, getNotes, updateNote, deleteNote } from "../controllers/note.js";

const router = Router();

router.post("/create", createNote);

router.get("/notes", getNotes);

router.put("/:id", updateNote);

router.delete("/delete/:noteId", deleteNote);

export default router;
