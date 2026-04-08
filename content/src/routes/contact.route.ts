import { Router } from "express";
import { contactController } from "../controllers/contact.controler.js";

const router = Router();

router.post("/contact", contactController);

export default router;