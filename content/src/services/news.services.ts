import { type News, Category } from "../generated/browser.js";
import { readData } from "../../utils/readData.js";
import { withLock } from "../../utils/withLock.js";
import { writeData } from "../../utils/writeData.js";


export const getNewsService = async (category?: Category) => {
    const news: News[] = await readData();
    return news.filter(item => {
        const matchCategory = !category || item.category === category;
        return matchCategory;
    }).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
};

export const createNewsServices = async (
    title: string, 
    description: string, 
    category: Category, 
    imageUrl?: string
) => {
    return await withLock(async () => {
        const news: News[] = await readData();

        const newArticle: News = {
            id: crypto.randomUUID(),
            title,
            description,
            category,
            imageUrl: imageUrl || null,
            viewsCount: 0,
            publishedAt: new Date(),
        };

        news.push(newArticle);
        await writeData(news)

        return newArticle;
    });
};