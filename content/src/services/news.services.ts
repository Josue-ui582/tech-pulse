import { Category } from '../generated/client.js';
import type { News } from '../generated/client.js';
import { readData } from "../../utils/readData.js";
import { withLock } from "../../utils/withLock.js";
import { writeData } from "../../utils/writeData.js";
import prisma from "../lib/pisma.js";


export const getNewsService = async (category?: Category, search?: string) => {
  return await prisma.news.findMany({
    where: {
      AND: [
        category ? { category: category } : {},
        
        search ? {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        } : {},
      ],
    },
    orderBy: {
      publishedAt: 'desc',
    },
    });
}

export const createNewsService = async (
    title: string, 
    description: string, 
    category: Category, 
    imageUrl?: string | null
): Promise<News> => {
    return await prisma.news.create({
        data: {
            title,
            description,
            category,
            imageUrl,
        },
    });
};

export const incrementViewsService = async (id: string): Promise<News> => {
    return await withLock(async () => {
        const news: News[] = await readData();
        const article = news.find(item => item.id === id);
        if (!article) {
            throw new Error(`Article avec l'ID ${id} introuvable`);
        }
        article.viewsCount += 1;

        await writeData(news);
        return article;
    });
};