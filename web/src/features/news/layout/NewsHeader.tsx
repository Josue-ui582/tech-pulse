import { useAsyncData } from "@/hooks";
import { getUniqueNew } from "@/services/api.news";
import { message, Tag, Typography } from "antd"
import { motion } from "framer-motion"
import { CalendarOutlined, EyeOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { formatDate } from "@/utils/formatDate";

interface NewHeaderProps {
    slug: string,
    views: number
}

const { Title } = Typography;

const NewsHeader = ({ slug, views }: NewHeaderProps) => {
    const { data: article } = useAsyncData(
        () => getUniqueNew(slug),
        [slug],
        {
        onError: (error) => {
            message.error("Erreur lors de la récupération de l'article :" + (error.message || "Erreur inconnue"));
        }
        }
    );
    return(
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
    )
}

export default NewsHeader;