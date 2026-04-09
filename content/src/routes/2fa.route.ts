import { Router } from "express";

const router = Router();

import { generateQRCode, verifyQRCode } from "../controllers/2fa.controller.js";

router.get("/generate", generateQRCode);
router.post("/verify", verifyQRCode);

export default router;