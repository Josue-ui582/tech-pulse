import { Category } from '../generated/client.js';
import type { News } from '../generated/client.js';
import { prisma } from '../lib/pisma.js';

interface UpdateNewsDto {
  title?: string;
  description?: string;
  category?: Category;
  imageUrl?: string;
}

export const getNewsService = async (category?: Category, search?: string) => {
  const where: any = {};

  if (category) {
    where.category = category;
  }

  if (search) {
    where.title = {
      contains: search,
      mode: 'insensitive',
    };
  }

  return await prisma.news.findMany({
    where,
    orderBy: {
      publishedAt: 'desc',
    },
  });
};

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

export const updataNewService = async (id : string, data: UpdateNewsDto) => {
  return await prisma.news.update({
    where: { id },
    data: data
  })
}

export const deleteNewService = async (id: string) => {
  return await prisma.news.delete({
    where: { id },
  });
};

export const getUniqueIdService = async (id: string) => {
  return await prisma.news.findUnique({
    where: { id }
  })
}