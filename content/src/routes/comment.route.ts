import { Router } from "express";
import { addCommentController, deleteCommentController, getCommentsController, updateCommentController } from "../controllers/comment.controller.js";

const router = Router();

router.post("/comment", addCommentController);
router.patch("/comment", updateCommentController);
router.delete("/comment", deleteCommentController);
router.get("/comment", getCommentsController)

export default router;