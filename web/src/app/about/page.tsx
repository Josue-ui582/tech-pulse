"use client";

import { motion } from "framer-motion";
import { Typography, Button, Row, Col, Card, Statistic, Divider } from "antd";
import { 
  RocketOutlined, 
  SafetyCertificateOutlined, 
  GlobalOutlined,
  ArrowRightOutlined 
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import AboutHeader from "@/features/about/components/aboutHeader";
import { AboutMissions } from "@/features/about/components/aboutMissions";
import AboutStatistic from "@/features/about/components/aboutStatistic";

const { Title, Paragraph, Text } = Typography;


const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.2 } }
};

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="bg-white min-h-screen">
        <AboutHeader />

      <AboutMissions />

      <AboutStatistic />

      <section className="py-24 max-w-4xl mx-auto text-center px-6">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden"
        >
          <div className="absolute top-12.5 right-12.5 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
          
          <Title level={2} className="text-white! text-3xl! md:text-5xl! font-bold! mb-8">
            Prêt à ne plus rien manquer ?
          </Title>
          <Paragraph className="text-slate-400 text-lg mb-10">
            Rejoignez des milliers de lecteurs passionnés et recevez l'essentiel de l'actu directement.
          </Paragraph>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              type="primary" 
              size="large" 
              icon={<ArrowRightOutlined />}
              onClick={() => router.push("/news")}
              className="h-14 px-8 bg-indigo-600 hover:bg-indigo-500! border-none rounded-full font-bold text-lg"
            >
              Explorer les news
            </Button>
            <Button 
              ghost 
              size="large" 
              className="h-14 px-8 rounded-full border-white text-white font-bold hover:text-indigo-400! hover:border-indigo-400!"
            >
              Nous contacter
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

// Petit composant Tag pour éviter les erreurs d'import AntD
const Tag = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-block px-3 py-1 rounded text-xs font-bold ${className}`}>
    {children}
  </span>
);