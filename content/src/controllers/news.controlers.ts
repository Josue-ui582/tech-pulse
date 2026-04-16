import type { Request, Response } from "express";
import { createNewsService, deleteNewService, getNewsService, getUniqueNewService, updataNewService } from "../services/news.services.js";
import fs from "fs/promises"
import { incrementViewsService } from "../services/news.services.js";
import type { Category } from "../generated/client.js";
import { CreateNewsSchema } from "../schema/news.schema.js";
import z from "zod";
import { Prisma } from "../generated/client.js";

export const getNewsController = async (req: Request, res: Response) => {
    const {category, search} = req.query;

    try {
        const news = await getNewsService(category as Category, search as string);
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des article" });
    }
};

export const createNewsController = async (req: Request, res: Response) => {
    const imageUrl = req.file ? `uploads/${req.file.filename}` : null;

    try {
        const validateData = CreateNewsSchema.parse({
            ...req.body,
            imageUrl
        })

        const news = await createNewsService(
            validateData.title, 
            validateData.description, 
            validateData.category, 
            validateData.imageUrl
        );
        
        res.status(201).json(news);
    } catch (error: any) {
        if (req.file) {
            await fs.unlink(req.file.path).catch(() => {}); 
        }

        if (error instanceof z.ZodError) {
            return res.status(400).json({ 
                errors: error.issues.map(e => ({ path: e.path, message: e.message })) 
            });
        }
        
        res.status(400).json({ 
            error: error.message || "Erreur lors de la création de l'article"
        });
    } 
};

export const incrementViewsController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { token } = req.cookies;

    if (!token) {
        res.status(401).json({ message: "Token d'authentification manquant." });
        return;
    }

    try {
        const updatedNews = await incrementViewsService(id as string);
        res.status(200).json(updatedNews);
    } catch (error: unknown) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ message: `Article avec l'ID ${id} introuvable` });
            return;
        }

        const message = error instanceof Error ? error.message : "Erreur serveur";
        res.status(500).json({ message });
    }
};

export const updatedNewsController = async (req: Request<{id: string}>, res: Response) => {
    try {
        const { id } = req.params;
        const { data } = req.body;

        if (!id) {
            return res.status(400).json({message: "L'id de l'article est requis"});
        }

        const updatedNews = await updataNewService(id, data);
        return res.status(200).json({
            success: true,
            message: "Article mise à jour avec succès",
            data : updatedNews
        })
    } catch (error: unknown) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return res.status(404).json({ message: "Cet article n'existe pas" });
            }
        }
        
        const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
        
        return res.status(500).json({ 
            message: "Erreur lors de la mise à jour", 
            error: errorMessage 
        });
    }
}

export const deleteNewController = async (req: Request<{id: string}>, res: Response) => {
    try {
        const { id } = req.params;
        await deleteNewService(id);

        return res.status(200).json({
        message: "Article supprimé avec succès"
        });

    } catch (error: unknown) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return res.status(404).json({ message: "Cet article n'existe pas ou a déjà été supprimé" });
            }
        }

        const errorMessage = error instanceof Error ? error.message : "Erreur serveur";
        return res.status(500).json({ message: "Erreur lors de la suppression", error: errorMessage });
    }
}

export const getUniqueNewController = async (req: Request<{id: string}>, res: Response) => {
    try {
        const { id } = req.params;

        const uniqueNew = await getUniqueNewService(id);

        if (!uniqueNew) {
            return res.status(404).json({ message: "Article non trouvé" });
        }

        const likesCount = uniqueNew.reactions.filter(r => r.type === "Like").length;
        const unlikesCount = uniqueNew.reactions.filter(r => r.type === "Unlike").length;

        return res.status(200).json({
            ...uniqueNew,
            likesCount,
            unlikesCount,
            reactions: undefined 
        });

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Erreur serveur";
        return res.status(500).json({ message });
    }
}