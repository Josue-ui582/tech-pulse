import { Button, Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const { Title } = Typography;


export default function AboutCta() {
    const router = useRouter();
    return (
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
            <p className="text-slate-400 text-lg mb-10">
                Rejoignez des milliers de lecteurs passionnés de la technologie informatique et recevez l'essentiel de l'actu directement.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
                <Button 
                type="primary" 
                size="large" 
                icon={<ArrowRightOutlined />}
                onClick={() => router.replace("/news")}
                className="h-14 px-8 bg-indigo-600 hover:bg-indigo-500! border-none rounded-full font-bold text-lg"
                >
                    Explorer les news
                </Button>
                <Button 
                ghost 
                size="large" 
                className="h-14 px-8 rounded-full border-white text-white font-bold hover:text-indigo-400! hover:border-indigo-400!" onClick={() => router.replace("/contact")}
                >
                    Nous contacter
                </Button>
            </div>
            </motion.div>
        </section>
    )
}