"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button, Tag, Divider, Typography, message } from "antd";
import { ArrowLeftOutlined, CalendarOutlined, EyeOutlined, ClockCircleOutlined, ShareAltOutlined } from "@ant-design/icons";
import { formatDate } from "@/utils/formatDate";
import { getUniqueNew, increateNewView } from "@/services/api";
import Loading from "@/app/admin/dashboard/loading";
import { useAsyncData } from "@/hooks";
import { number } from "yup";

const { Title, Paragraph } = Typography;
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
    <motion.main 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-12"
    >
      <nav className="mb-8 flex justify-between items-center">
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />} 
          onClick={() => router.push("/news")}
          className="flex items-center text-slate-500 hover:text-indigo-600 font-medium"
        >
          Retour aux actualités
        </Button>
        <Button shape="circle" icon={<ShareAltOutlined />} />
      </nav>

      <header className="mb-10 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Tag color="blue" className="mb-4 uppercase tracking-widest font-bold px-3 py-1 rounded-full border-none bg-indigo-50 text-indigo-600">
            {article?.category || "Actualité"}
          </Tag>
          <Title level={1} className="text-4xl md:!text-5xl! font-black text-slate-900 leading-tight mb-6">
            {article?.title || "Titre de l'article en cours de chargement"}
          </Title>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-slate-400 text-sm">
            <span className="flex items-center gap-2">
              <CalendarOutlined className="text-indigo-500" />
              {article ? formatDate(article.publishedAt) : "--/--/----"}
            </span>
            <span className="flex items-center gap-2">
              <ClockCircleOutlined className="text-indigo-500" />
              5 min de lecture
            </span>
            <span className="flex items-center gap-2">
              <EyeOutlined className="text-indigo-500" />
              {views} vues
            </span>
          </div>
        </motion.div>
      </header>

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

      <footer className="mt-16 pt-8 border-t border-slate-100 flex flex-col items-center">
        <h4 className="text-slate-900 font-bold mb-4">Partagez cet article</h4>
        <div className="flex gap-4">
           <Button type="primary" shape="round" className="bg-indigo-600">Twitter</Button>
           <Button shape="round">LinkedIn</Button>
           <Button shape="round">Facebook</Button>
        </div>
      </footer>
    </motion.main>
  );
}
