import { Tag, Typography, } from "antd";
import { motion } from "framer-motion";

const { Title, Paragraph } = Typography;

export default function AboutHeader() {
    return (
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-slate-900 text-white px-4">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="https://unsplash.com" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-slate-900/60 to-slate-900" />
        </div>

        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl"
        >
          <Tag className="bg-indigo-600 border-none text-white px-4 py-1 mb-6 rounded-full uppercase tracking-[0.2em] font-bold">
            Qui sommes-nous ?
          </Tag>
          <Title className="text-white! text-5xl! md:text-7xl! font-black! mb-6">
            L'information, <span className="text-indigo-400">redéfinie</span>.
          </Title>
          <Paragraph className="text-slate-300 text-lg md:text-xl leading-relaxed">
            Nous croyons en un journalisme transparent, rapide et accessible à tous. 
            Une plateforme où chaque nouvelle compte.
          </Paragraph>
        </motion.div>
      </section>
    )
}