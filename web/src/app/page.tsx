import NewsCard from "../features/news/components/NewsCard";
import { SearchBar } from "../features/search/components/SearchBar";
import { getNews } from "../services/api";
import { News } from "../types/news";

export const revalidate = 60;

export default async function HomePage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const news = await getNews(category);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-4">
          L'actualité Tech, <span className="text-blue-600">réinventée.</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Découvrez les dernières innovations avec une expérience de lecture fluide et minimaliste.
        </p>
      </section>

      <div className="mb-10">
        <SearchBar />
      </div>
      <article>
        {
          news.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 rounded-[2.5rem] bg-slate-50 border border-dashed border-slate-200">
                <div className="relative">
                  <div className="absolute inset-0 blur-2xl bg-indigo-200 rounded-full opacity-50" />
                  <span className="relative text-6xl">✨</span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-900">Tout est terminé !</h3>
                <p className="text-slate-500 mt-1">Profitez de votre temps libre ou créez une nouvelle tâche.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
          {news.map((article: News) => (
            <div key={article.id} className="group relative">
              <div className="absolute rounded-4xl opacity-0 group-hover:opacity-100 transition" />
              <div className="relative">
                <NewsCard articles={article} />
              </div>
            </div>
          ))}
        </div>
          )
        }
      </article>
    </main>
  );
}
