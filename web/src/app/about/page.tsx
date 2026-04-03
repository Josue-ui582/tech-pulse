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

      <section className="max-w-7xl mx-auto py-24 px-6">
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { icon: <GlobalOutlined />, title: "Portée Mondiale", desc: "Couverture instantanée des événements aux quatre coins du globe." },
            { icon: <SafetyCertificateOutlined />, title: "Vérification", desc: "Chaque information est sourcée et vérifiée avant publication." },
            { icon: <RocketOutlined />, title: "Innovation", desc: "Une expérience utilisateur pensée pour la lecture numérique moderne." }
          ].map((item, index) => (
            <motion.div key={index} variants={fadeIn}>
              <Card className="h-full border-none shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl p-4 bg-slate-50 group">
                <div className="text-4xl text-indigo-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <Title level={3} className="text-slate-900!">{item.title}</Title>
                <Paragraph className="text-slate-500 text-base">{item.desc}</Paragraph>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="bg-indigo-600 py-20 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <Row gutter={[32, 32]} justify="center">
            <Col xs={12} md={6}>
              <Statistic 
                value={150} 
                suffix="K" 
                title={<span className="text-indigo-100">Lecteurs mensuels</span>} 
                valueStyle={{ color: 'white', fontWeight: 900, fontSize: '2.5rem' }} 
              />
            </Col>
            <Col xs={12} md={6}>
              <Statistic 
                value={12} 
                suffix="M" 
                title={<span className="text-indigo-100">Articles partagés</span>} 
                valueStyle={{ color: 'white', fontWeight: 900, fontSize: '2.5rem' }} 
              />
            </Col>
            <Col xs={12} md={6}>
              <Statistic 
                value={50} 
                suffix="+" 
                title={<span className="text-indigo-100">Journalistes</span>} 
                valueStyle={{ color: 'white', fontWeight: 900, fontSize: '2.5rem' }} 
              />
            </Col>
          </Row>
        </div>
      </section>

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