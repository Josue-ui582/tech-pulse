"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button, Tag, Divider, Spin, Typography } from "antd";
import { ArrowLeftOutlined, CalendarOutlined, EyeOutlined, ClockCircleOutlined, ShareAltOutlined } from "@ant-design/icons";
import { News } from "@/types/news";
import { formatDate } from "@/utils/formatDate";
// Importe ton service pour récupérer un article par son ID/slug
// import { getNewsById } from "@/services/api"; 

const { Title, Paragraph } = Typography;
const BACKEND_URL = "http://localhost:3001";

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [article, setArticle] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulation de récupération de données (à remplacer par ton fetch réel)
  useEffect(() => {
    // const fetchData = async () => {
    //   const data = await getNewsById(params.slug);
    //   setArticle(data);
    //   setLoading(false);
    // };
    // fetchData();
    
    // Simulation pour le design :
    setLoading(false);
  }, [params.slug]);

  if (loading) return <div className="h-screen flex justify-center items-center"><Spin size="large" /></div>;

  return (
    <motion.main 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-12"
    >
      {/* Barre de navigation haute */}
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

      {/* En-tête de l'article */}
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
              {article?.viewsCount || 0} vues
            </span>
          </div>
        </motion.div>
      </header>

      {/* Image à la Une */}
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

      {/* Contenu de l'article */}
      <article className="prose prose-slate prose-lg max-w-none">
        <Paragraph className="text-xl text-slate-600 font-medium leading-relaxed italic mb-8 border-l-4 border-indigo-500 pl-6">
          {article?.description || "Résumé de l'article..."}
        </Paragraph>
        
        <Divider />

        <div className="text-slate-800 leading-loose space-y-6 text-lg">
           {/* C'est ici que tu injecterais le contenu riche (Rich Text) de ton backend */}
           <p>
             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
             Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
           </p>
           <p>
             Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
             Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
           </p>
        </div>
      </article>

      {/* Footer de l'article */}
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
