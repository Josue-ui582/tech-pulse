import { Router } from "express";
import { addCommentController, deleteCommentController, updateCommentController } from "../controllers/comment.controller.js";

const router = Router();

router.post("/comment", addCommentController);
router.patch("/comment", updateCommentController);
router.delete("/comment", deleteCommentController);

export default router;