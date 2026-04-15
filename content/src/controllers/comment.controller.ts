import type { Request, Response } from "express";
import { addCommentService } from "../services/comments.service.js";

export const addCommentController = async (req: Request, res: Response) => {
    const { token } = req.cookies;
    const { newId } = req.params;
    const { comment } = req.body;

    if (!token) {
        return res.status(401).json({ message: "Authentification requise" });
    }

    if (!newId || !comment || comment.trim() === "") {
        return res.status(400).json({ message: "ID de la news ou commentaire manquant" });
    }

    try {
        const reponse = await addCommentService(newId as string, comment);

        return res.status(201).json({
            message: "Commentaire ajouté avec succès",
            data: reponse
        });

    } catch (error: any) {
        return res.status(500).json({
            message: "Une erreur est survenue lors de l'ajout du commentaire",
            error: error.message
        });
    }
};