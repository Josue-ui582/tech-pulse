import { Router } from "express";
import { generateQRCode, verifyQRCode } from "../controllers/2fa.controller.js";

const router = Router();

router.get("/generate", generateQRCode);
router.post("/verify", verifyQRCode);

export default router;