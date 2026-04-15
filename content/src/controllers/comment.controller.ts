import type { Request, Response } from "express";
import { addCommentService, updateCommentService } from "../services/comments.service.js";

export const addCommentController = async (req: Request, res: Response) => {
    const { token } = req.cookies;
    const { newId } = req.query;
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

export const updateCommentController = async (req: Request, res: Response) => {
    const { token } = req.cookies;
    const { commentId } = req.query;
    const { comment } = req.body;

    if (!token) {
        return res.status(401).json({ message: "Authentification requise" });
    }

    if (!commentId || comment.trim() === "") {
        return res.status(400).json({ message: "Commentaire manquant" });
    }

    if (!commentId) {
        return res.status(400).json({ message: "ID de la news manquant" });
    }

    try {
        const response = await updateCommentService(commentId as string, comment);

        return res.status(200).json({
            message: "Commentaire mis à jour",
            data: response
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Erreur lors de la mise à jour de commentaire",
            error: error.message 
        });
    }
}