"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button, Tag, Divider, Typography, message } from "antd";
import { getUniqueNew, increateNewView } from "@/services/api.news";
import Loading from "@/app/admin/dashboard/loading";
import { useAsyncData } from "@/hooks";
import NewNav from "@/features/news/layout/NewNav";
import NewsHeader from "@/features/news/layout/NewsHeader";
import NewsFooter from "@/features/news/layout/NewsFooter";
import NewsComments from "@/features/news/layout/NewsComment";
import { Navbar } from "@/components/layout/navbar";

const { Paragraph } = Typography;
const BACKEND_URL = "http://localhost:3001";

export default function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params); 
  const slug = resolvedParams.slug;
  const router = useRouter();
  const { data: article, loading, error } = useAsyncData(
    () => getUniqueNew(slug),
    [slug],
    {
      onError: (error) => {
        message.error("Erreur lors de la récupération de l'article :" + (error.message || "Erreur inconnue"));
      }
    }
  );
  const [views, setViews] = useState<number>(0);

  useEffect(() => {
  if (article) {
    setViews(article.viewsCount);
  }
}, [article]);

useEffect(() => {
  if (!article) return;

  const viewed = sessionStorage.getItem(`viewed-${slug}`);

  if (!viewed) {
    setViews(article.viewsCount + 1);

    increateNewView(slug).catch(() => {
      setViews(article.viewsCount); // rollback
    });

    sessionStorage.setItem(`viewed-${slug}`, "true");
  }
}, [article, slug]);

  if (loading) return <Loading />;
  if (error) return (
    <div className="h-screen flex flex-col items-center justify-center">
        <div className="max-w-2xl mx-auto p-6 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-center group-[]:">
        <p className="text-lg font-semibold">⚠️ {error}</p>
        <Button className="mt-4 hover:bg-blue-600 hover:text-white hover:font-bold translate-0.5" onClick={() => router.replace("/news")}>Retour aux actualités</Button>
        </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4 py-12 mt-8"
      >
        <NewNav slug={slug} />

        <NewsHeader slug={slug} views={views} />

        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden shadow-2xl mb-12"
        >
          <img
            alt={article?.title}
            src={article?.imageUrl ? `${BACKEND_URL}/${article.imageUrl}` : "https://alipayobjects.com"}
            className="object-cover w-full h-full"
          />
        </motion.div>

        <article className="prose prose-slate prose-lg max-w-none">
          <Paragraph className="text-xl text-slate-600 font-medium leading-relaxed italic mb-8 border-l-4 border-indigo-500 pl-6">
            {article?.description || "Résumé de l'article..."}
          </Paragraph>
          
          <Divider />
        </article>
        <NewsComments slug={slug} />

        <NewsFooter slug={slug} />
      </motion.main>
    </>
  );
}
