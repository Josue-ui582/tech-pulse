import NewsCard from "../features/news/components/NewsCard";
import { SearchBar } from "../features/search/components/SearchBar";
import { SearchCategory } from "../features/search/components/searchCategory";
import { getNews } from "../services/api";
import { Category, News } from "../types/news";
import Link from "next/link";
import { PlusOutlined } from "@ant-design/icons";

export const revalidate = 60;

type HomePageProps = {
  searchParams: {
    category?: string;
    search?: string
  };
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const { category, search } = await searchParams;
  const categoryEnum: Category | undefined =
    category && ["Tech", "IA", "Dev"].includes(category)
      ? (category as Category)
      : undefined;
  const news = await getNews(categoryEnum, search);

  return (
    <main className="min-h-screen bg-[#fafafa] selection:bg-indigo-100">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-125 bg-[radial-gradient(45%_40%_at_50%_0%,rgba(79,70,229,0.07)_0%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-20 relative">
        <section className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Live Updates
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-slate-900 bg-linear-to-b from-slate-900 via-slate-800 to-slate-500">
            L'actualité Tech, <br />
            <span className="text-indigo-600 italic">réinventée.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Découvrez les dernières innovations avec une expérience de lecture fluide, minimaliste et sans distraction.
          </p>
        </section>

        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6 p-2 bg-white/60 backdrop-blur-xl border border-white rounded-3xl shadow-sm">
          <div className="flex flex-col md:flex-row gap-3 w-full">
            <SearchBar />
            <SearchCategory />
          </div>
        </div>

        <article>
          {news.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-40 rounded-[3rem] bg-white border border-slate-100 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-indigo-200 to-transparent" />
                <div className="relative">
                  <div className="absolute inset-0 blur-3xl bg-indigo-200/50 rounded-full" />
                  <span className="relative text-7xl mb-4 block animate-bounce">🔭</span>
                </div>
                <h3 className="mt-8 text-2xl font-bold text-slate-900">Aucun résultat</h3>
                <p className="text-slate-500 mt-2 text-center max-w-sm px-6">
                  Nous n'avons pas trouvé d'articles pour cette recherche. Essayez d'autres mots-clés ou catégories.
                </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {news.map((article: News) => (
                <div key={article.id} className="group transition-all duration-500">
                  <div className="relative transform group-hover:-translate-y-2 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                    <NewsCard articles={article} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </article>
      </div>
    </main>
  );
}
