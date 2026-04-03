"use client"

import NewsCard from "@/features/news/components/NewsCard";
import { SearchBar } from "@/features/search/components/SearchBar";
import { SearchCategory } from "@/features/search/components/searchCategory";
import { News } from "@/types/news";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/utils/auth";
import Loading from "../admin/dashboard/loading";
import { Navbar } from "@/components/ui/navbar";

export default function NewsPageContent({ news }: { news: News[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const checkAuth = async () => {
    const userData = await getUser();

    if (!userData) {
      router.replace("/auth");
      return;
    }

    if (userData.role !== "user") {
      router.replace("/unauthorized");
      return;
    }

    setLoading(false);
  };

  checkAuth();
}, []);

  if (loading) return <Loading />;

  return (
    <main className="min-h-screen bg-[#FAFAFA] selection:bg-indigo-100">
      <Navbar />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-150 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(79,70,229,0.04)_0%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative">
        
        <header className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-indigo-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Flux en direct
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tight text-slate-900 mb-8 leading-[0.9]">
            L'actualité Tech, <br />
            <span className="text-indigo-600 font-serif italic font-medium">réinventée.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Le condensé d'innovation pour les bâtisseurs de demain. 
            Une expérience sans distraction, focalisée sur l'essentiel.
          </p>
        </header>

        <div className="sticky top-6 z-30 mb-16">
          <div className="p-2 bg-white/70 backdrop-blur-2xl border border-white/50 rounded-[2.5rem] shadow-xl shadow-slate-200/50 flex flex-col md:flex-row items-center gap-3">
            <SearchBar />
            <div className="h-8 w-px bg-slate-200 hidden md:block" />
            <SearchCategory />
          </div>
        </div>

        <article className="relative">
          {news.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 rounded-[3.5rem] bg-white border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(79,70,229,0.03),transparent)]" />
                <div className="relative flex flex-col items-center">
                  <span className="text-6xl mb-6 grayscale opacity-50">🔭</span>
                  <h3 className="text-2xl font-bold text-slate-900">Silence radio...</h3>
                  <p className="text-slate-500 mt-3 text-center max-w-xs leading-relaxed">
                    Aucun article ne correspond à votre recherche. Essayez de varier les mots-clés.
                  </p>
                </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
              {news.map((article: News) => (
                <div 
                  key={article.id} 
                  className="group bg-white p-3 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-500"
                >
                  <NewsCard article={article} />
                </div>
              ))}
            </div>
          )}
        </article>
      </div>

      <footer className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-100 mt-20 text-center">
          <p className="text-sm text-slate-400 font-medium">
            © {new Date().getFullYear()} TechPulse — Fabriqué pour les passionnés.
          </p>
      </footer>
    </main>
  );
}