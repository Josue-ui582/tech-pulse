import 'dotenv/config';

import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { generate2FACode, verify2FACode, disabled2FAService } from "../services/2fa.service.js";
import { prisma } from '../lib/pisma.js';
import { success } from 'zod';

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
    const userId = req.cookies.temp_user_id;
    const { code } = req.body;

    if (!userId) {
        return res.status(400).json({ message: "Session expirée ou code manquant." });
    }

    if (!code) {
        return res.status(400).json({ message: "Code non envoyé."})
    }

    try {
        const isValid = await verify2FACode(userId, String(code));
        if (isValid) {
            const user = await prisma.user.findUnique({ where: { id: userId } });

            const token = jwt.sign(
                { id: user!.id, role: user!.role },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.clearCookie("temp_user_id");
            res.cookie("token",
                token, { 
                    httpOnly: true, 
                    maxAge: 24 * 60 * 60 * 1000 
                });

            res.json({ success: true, message: "Connexion réussie." });
        } else {
            res.status(400).json({ message: "Code 2FA invalide." });
        }
    } catch (err) {
        res.status(400).json({ message: err instanceof Error ? err.message : "Erreur lors de la vérification du code 2FA." });
    }
}

export const desabled2FAController = async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        throw new Error("Session expirée ou non autorisée.");
    }

    try {
        await disabled2FAService(userId);
        return res.status(200).json({
            success: true,
            message : "2FA désactivé avec succès "
        })
    } catch (error: any) {
        return res.status(400).json({
        success: false,
        message: error.message || "Erreur lors de la désactivation du 2FA",
    });
    }
}