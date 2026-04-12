import { Router } from "express";
import { desabled2FAController, generateQRCode, verifyQRCode } from "../controllers/2fa.controller.js";

const router = Router();

router.post("/generate", generateQRCode);
router.post("/verify", verifyQRCode);
router.post("/desabled", desabled2FAController)

export default router;