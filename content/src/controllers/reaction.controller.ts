import type { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { toggleReactionService } from "../services/reaction.service.js";

const JWT_SECRET = process.env.JWT_SECRET_SECRET as string;

export const handleReaction = async (req: Request, res: Response) => {
    const { newsId, type } = req.body;
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: "Authentification requise" });
    }

    if (!newsId) {
        return res.status(401).json({ message: "Article introuvable" });
    }

    if (!type) {
        return res.status(401).json({ message: "Type de reaction requis" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string }
        const userId = decoded.id;
        await toggleReactionService(newsId, userId, type);

        return res.status(200).json({ message: "Réaction mise à jour" });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}