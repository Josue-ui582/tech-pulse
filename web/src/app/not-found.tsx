"use client";

import { motion } from "framer-motion";
import { Button, Typography } from "antd";
import { HomeOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title, Paragraph } = Typography;

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 overflow-hidden relative">
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-50" />

      <div className="max-w-2xl w-full text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-[12rem] md:text-[16rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-slate-900 to-slate-400 opacity-10 select-none">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="-mt-16 md:-mt-24"
        >
          <Title level={1} className="text-3xl! md:text-5xl! font-black! text-slate-900! mb-6">
            Oups ! Cette page s'est perdue.
          </Title>
          
          <Paragraph className="text-slate-500 text-lg md:text-xl max-w-lg mx-auto mb-10 leading-relaxed">
            L'article ou la page que vous recherchez n'existe pas ou a été déplacé vers une autre catégorie.
          </Paragraph>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Button 
              type="primary" 
              size="large" 
              icon={<HomeOutlined />}
              onClick={() => router.push("/")}
              className="h-14 px-8 bg-indigo-600 hover:bg-indigo-500! border-none rounded-2xl font-bold text-base w-full md:w-auto shadow-lg shadow-indigo-200"
            >
              Retour à l'accueil
            </Button>
            
            <Button 
              size="large" 
              icon={<ArrowLeftOutlined />}
              onClick={() => router.back()}
              className="h-14 px-8 rounded-2xl border-slate-200 text-slate-600 font-bold text-base w-full md:w-auto hover:border-indigo-600! hover:text-indigo-600!"
            >
              Page précédente
            </Button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 pt-8 border-t border-slate-100"
        >
          <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">
            TechPulse • Edition { new Date().getFullYear() }
          </p>
        </motion.div>
      </div>
    </div>
  );
}