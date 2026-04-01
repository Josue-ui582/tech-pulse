// app/page.tsx
import { Navbar } from "@/components/ui/navbar";
import { Hero } from "@/components/ui/hero";
import { Features } from "@/components/ui/feature";
import { Footer } from "@/components/ui/footer";
import NewsCard from "@/features/news/components/NewsCard";
import { featuredNews } from "@/data/preview";
import Image from "next/image";

export default function HomePage() {

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <section id="news" className="py-20 bg-[#fafafa]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Dernières pépites</h2>
                <p className="text-slate-500">Les articles qui font vibrer l'écosystème en ce moment.</p>
              </div>
              <button className="hidden sm:block text-indigo-600 font-semibold hover:underline">
                Voir tout le flux →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredNews.map((item) => (
                <div key={item.id} className="group bg-white p-3 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-500">
  
                {/* Container Image avec Aspect Ratio */}
                <div className="relative aspect-16/10 w-full rounded-4xl overflow-hidden mb-6">
                  {/* Overlay subtil pour le contraste */}
                  <div className="absolute inset-0 bg-slate-900/5 z-10 group-hover:bg-transparent transition-colors duration-500" />
                  
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* Badge de catégorie flottant sur l'image */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-slate-900 uppercase tracking-widest shadow-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Contenu Texte */}
                <div className="px-4 pb-4">
                  <div className="flex items-center gap-3 text-slate-400 text-xs mb-3">
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {item.date}
                    </span>
                    <span>•</span>
                    <span>5 min de lecture</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-slate-500 text-sm mt-3 line-clamp-2 leading-relaxed">
                    Découvrez comment cette technologie transforme radicalement notre approche du quotidien...
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-indigo-600 font-bold text-sm">
                    Lire l'article
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
              ))}
            </div>
          </div>
        </section>

        <Features />
      </main>

      <Footer />
    </div>
  );
}