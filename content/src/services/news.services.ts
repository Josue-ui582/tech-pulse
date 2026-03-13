import { type News, Category } from "../generated/browser.js";
import { readData } from "../../utils/readData.js";


export const getNewsService = async (category?: Category) => {
    const news: News[] = await readData();
    return news.filter(item => {
        const matchCategory = !category || item.category === category;
        return matchCategory;
    }).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
};