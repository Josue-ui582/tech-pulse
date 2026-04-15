import { useAsyncData } from "@/hooks";
import { getUniqueNew } from "@/services/api";
import { Button, message } from "antd"

interface NewsFooterProps {
    slug: string
}

const NewsFooter = ({ slug }: NewsFooterProps) => {
    const { data: article } = useAsyncData(
        () => getUniqueNew(slug),
        [slug],
        {
        onError: (error) => {
            message.error("Erreur lors de la récupération de l'article :" + (error.message || "Erreur inconnue"));
        }
        }
    );
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";

    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(article?.title || "");
    return(
        <footer className="mt-16 pt-8 border-t border-slate-100 flex flex-col items-center">
        <h4 className="text-slate-900 font-bold mb-4">Partagez cet article</h4>
        <div className="flex gap-4">
           <Button
            type="primary"
            shape="round"
            className="bg-indigo-600"
            onClick={() =>
              window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, "_blank")
            }
          >
            Twitter
          </Button>

          <Button
            shape="round"
            onClick={() =>
              window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, "_blank")
            }
          >
            LinkedIn
          </Button>

          <Button
            shape="round"
            onClick={() =>
              window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, "_blank")
            }
          >
            Facebook
          </Button>
        </div>
      </footer>
    )
}

export default NewsFooter;