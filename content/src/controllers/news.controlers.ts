import type { Request, Response } from "express";
import { createNewsServices, getNewsService } from "../services/news.services.js";
import { Category } from "../generated/browser.js";
import fs from "fs/promises"
import { incrementViewsService } from "../services/news.services.js";

export const getNewsController = async (req: Request, res: Response) => {
    const categoryQuery = req.query.category as string;

    try {
        const isValidCategory = Object.values(Category).includes(categoryQuery as Category);
        const news = await getNewsService(isValidCategory ? (categoryQuery as Category) : undefined);
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des article" });
    }
};

export const createNewsController = async (req: Request, res: Response) => {
    const {title, description, category} = req.body;
    const imageUrl = req.file ? `uploads/${req.file.filename}` : null;

    try {
        if (!title || !description || !category) {
            throw new Error("Champs obligatoires manquants")
        }
        const news = await createNewsServices(title, description, category, imageUrl ?? undefined);
        res.status(201).json(news);
    } catch (error: unknown) {
        if (req.file) {
            await fs.unlink(req.file.path).catch(() => {}); 
        }
        res.status(400).json({ 
            error: "Erreur lors de la création de l'article"
        });
    } 
}

export const incrementViewsController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const updatedNews = await incrementViewsService(id as string);
        res.status(200).json(updatedNews);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};
