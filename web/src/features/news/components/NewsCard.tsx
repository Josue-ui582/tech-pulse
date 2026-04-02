"use client";

import { useState } from "react";
import { News } from "@/types/news";
import { formatDate } from "@/utils/formatDate";
import { increateNewView } from "@/services/api";
import { ReadMoreIcon } from "../../../../public/icons/readMoreIcon";

const BACKEND_URL = "http://localhost:3001";

const NewsCard = ({ article }: { article: News }) => {
  const [expanded, setExpanded] = useState(false);
  const [currentViews, setCurrentViews] = useState(article.viewsCount);

  const handleExpand = async () => {
    setExpanded(prev => !prev);

    if (!expanded) {
      try {
        const stored = localStorage.getItem("viewed_news");
        const viewedNews = stored ? JSON.parse(stored) : [];

        if (!viewedNews.includes(article.id)) {
          const updateData = await increateNewView(article.id);

          if (updateData) {
            setCurrentViews(updateData.viewsCount);
            viewedNews.push(article.id);
            localStorage.setItem("viewed_news", JSON.stringify(viewedNews));
          }
        }
      } catch (error) {
        console.error("Erreur gestion des vues :", error);
      }
    }
  };

  return (
    <>
      <div 
        onClick={handleExpand}
        className="relative aspect-16/10 w-full rounded-4xl overflow-hidden mb-6 cursor-pointer group"
      >
        <div className="absolute inset-0 bg-slate-900/5 z-10 group-hover:bg-transparent transition-colors duration-500" />

        <img
          draggable={false}
          alt={article.title}
          src={
            article.imageUrl
              ? `${BACKEND_URL}/${article.imageUrl}`
              : "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          }
          className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
        />

        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-slate-900 uppercase tracking-widest shadow-sm">
            {article.category}
          </span>
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="flex items-center gap-3 text-slate-400 text-xs mb-3">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formatDate(article.publishedAt)}
          </span>

          <span>•</span>
          <span>5 min de lecture</span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors duration-300">
          {article.title}
        </h3>

        <p className="text-slate-500 text-sm mt-3 line-clamp-2 leading-relaxed">
          {article.description}
        </p>

        <div className="mt-6 flex items-center gap-4 text-sm">
          <span className="text-gray-500">
            👁 {currentViews}
          </span>

          <div className="flex items-center gap-2 text-indigo-600 font-bold cursor-pointer">
            Lire l'article
            <ReadMoreIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsCard;