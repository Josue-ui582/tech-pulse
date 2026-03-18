import { Category } from '../generated/client.js';
import type { News } from '../generated/client.js';
import prisma from '../lib/pisma.js';


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
            imageUrl: imageUrl ?? null, 
        },
    });
};


export const incrementViewsService = async (id: string): Promise<News> => {
    return await prisma.news.update({
        where: { id },
        data: {
            viewsCount: {
                increment: 1
            }
        }
    });
};