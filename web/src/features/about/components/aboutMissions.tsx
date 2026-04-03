import { motion } from "framer-motion";
import { Typography, Card,} from "antd";
import { 
  RocketOutlined, 
  SafetyCertificateOutlined, 
  GlobalOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.2 } }
};

export const AboutMissions = () => {
    return (
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
    )
}