import { Category } from "../types/news"


const API_URL = "http://localhost:3001/api/news"

export const getNews = async (category: Category) => {
    const params = new URLSearchParams();
    if(category) params.append("category", category);

    try {
        const res = await fetch(`${API_URL}?${params.toString()}`, {
            cache: "no-store"
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new ReferenceError(errorData.error || `Erreur HTTP: ${res.status} (Impossible de charger les articles)`)
        }

        console.log(res);

        return await res.json()
    } catch (error) {
        if(error instanceof ReferenceError) throw error;
        throw new ReferenceError("Le serveur est injoignable. Vérifier votre connexion");
    }
}