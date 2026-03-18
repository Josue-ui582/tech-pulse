import type { Request, Response } from "express";
import { createNewsService, getNewsService } from "../services/news.services.js";
import fs from "fs/promises"
import { incrementViewsService } from "../services/news.services.js";
import type { Category } from "../generated/enums.js";
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