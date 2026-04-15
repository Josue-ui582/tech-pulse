import { useAsyncData } from "@/hooks";
import { getUniqueNew } from "@/services/api";
import { Button, message } from "antd"
import { useRouter } from "next/navigation"
import { ArrowLeftOutlined, ShareAltOutlined } from "@ant-design/icons";

interface NewNavProps {
  slug: string;
}

const NewNav = ( { slug }: NewNavProps ) => {
    const router = useRouter();
    const { data: article } = useAsyncData(
        () => getUniqueNew(slug),
        [slug],
        {
        onError: (error) => {
            message.error("Erreur lors de la récupération de l'article :" + (error.message || "Erreur inconnue"));
        }
        }
    );

    const handleSearch = async () => {
        if(!article) return;

        const searData = {
            title: article.title,
            texte: article.description,
            url: window.location.href
        };

        try {
            if (navigator.share) {
            await navigator.share(searData)
            }else {
            await navigator.clipboard.writeText(searData.url);
            message.success("Lien copié dans le presse-papier !")
            }
        } catch (error) {
            message.error("Imposible de partager l'article pour le moment")
        }
    }

    return(
        <nav className="mb-8 flex justify-between items-center">
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />} 
          onClick={() => router.push("/news")}
          className="flex items-center text-slate-500 hover:text-indigo-600 font-medium"
        >
          Retour aux actualités
        </Button>
        <Button shape="circle" icon={<ShareAltOutlined />} onClick={handleSearch} />
      </nav>
    )
}

export default NewNav;