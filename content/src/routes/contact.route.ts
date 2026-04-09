import { Router } from "express";
import { contactController } from "../controllers/contact.controler.js";

const router = Router();

router.post("/", contactController);

export default router;