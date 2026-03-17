import { Category, News } from "../types/news";


const API_URL = "http://localhost:3001/api/news"

const getOrCreateId = (): string => {
  let id = localStorage.getItem("x-client-id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("x-client-id", id);
  }
  console.log(id)
  return id;
}

export const getNews = async (category?: Category, search?: string) => {
    const params = new URLSearchParams();
    if(category) params.append("category", category);
    if(search) params.append("search", search);

    try {
        const res = await fetch(`${API_URL}?${params.toString()}`, {
            cache: "no-store"
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new ReferenceError(errorData.error || `Erreur HTTP: ${res.status} (Impossible de charger les articles)`);
        }

        return await res.json();
    } catch (error) {
        if(error instanceof ReferenceError) throw error;
        throw new ReferenceError("Le serveur est injoignable. Vérifier votre connexion");
    }
}

export const CreateNewsForms = async (title: string, description: string, category: Category, imageFile?: File) => {
    try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        
        if (imageFile) {
            formData.append('image', imageFile);
        }

        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "x-client-id": getOrCreateId(),
            },
            body: formData,
        });

        if (!res.ok) {
            const errorBody = await res.json().catch(() => ({})); 
            throw new Error(errorBody.error || `Erreur serveur : ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        if(error instanceof Error) throw error;
        throw new Error("Une erreur inconnue est survenue");
    }
}
