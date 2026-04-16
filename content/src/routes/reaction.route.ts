import { Router } from "express";
import { handleReaction } from "../controllers/reaction.controller.js";
const router = Router();

router.post("/reaction", handleReaction);

export default router;