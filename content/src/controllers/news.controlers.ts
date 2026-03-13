import type { Request, Response } from "express";
import { getNewsService } from "../services/news.services.js";
import { Category } from "../generated/browser.js";

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
