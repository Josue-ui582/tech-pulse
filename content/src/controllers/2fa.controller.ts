import 'dotenv/config';

import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { generate2FACode, verify2FACode } from "../services/2fa.service.js";

const JWT_SECRET = process.env.JWT_SECRET_SECRET as string;

export const generateQRCode = async (req: Request, res: Response) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Token d'authentification manquant." });
    }

    try {
        const decoded: any = jwt.verify(token, JWT_SECRET);
        const {  qrCode } = await generate2FACode(decoded.id);
        res.json({ qrCode });
    } catch (err) {
        res.status(400).json({ message: err instanceof Error ? err.message : "Erreur lors de la génération du QR code." });
    }
}

export const verifyQRCode = async (req: Request, res: Response) => {
    const token = req.cookies.token;
    const { code } = req.body;

    if (!token) {
        return res.status(401).json({ message: "Token d'authentification manquant." });
    }

    if (!code) {
        return res.status(400).json({ message: "Code 2FA manquant." });
    }

    try {
        const decoded: any = jwt.verify(token, JWT_SECRET);
        const isValid = await verify2FACode(decoded.id, String(code));
        if (isValid) {
            res.json({ message: "2FA vérifié avec succès." });
        } else {
            res.status(400).json({ message: "Code 2FA invalide." });
        }
    } catch (err) {
        res.status(400).json({ message: err instanceof Error ? err.message : "Erreur lors de la vérification du code 2FA." });
    }
}