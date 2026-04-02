import { getNews } from "@/services/api";
import { Category } from "@/types/news";
import NewsPageContent from "./NewsPageContent";

export const revalidate = 60;

type HomePageProps = {
  searchParams: { category?: string; search?: string };
};

export default async function NewsPage({ searchParams }: HomePageProps) {
  const { category, search } = await searchParams;
  
  const categoryEnum: Category | undefined =
    category && ["Tech", "AI", "Dev"].includes(category)
      ? (category as Category) : undefined;

  const news = await getNews(categoryEnum, search);

  return <NewsPageContent news={news} />;
}