import { FetchEventResult } from "next/dist/server/web/types";
import { Category, UpdateNewsData } from "../types/news";


const API_URL = "http://localhost:3001/api/news"
const API_URL_Auth = "http://localhost:3001/api"


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
    const token = typeof window !== undefined ? localStorage.getItem("token") : null;

    if (!token) {
        throw new Error("Vous devez être connecté pour publier un article.");
    }

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
                "Authorization": `Bearer ${token}`
            },
            body: formData,
        });

        if (!res.ok) {
            const errorBody = await res.json().catch(() => ({})); 
            throw new Error(errorBody.message || errorBody.error || `Erreur : ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        if(error instanceof Error) throw error;
        throw new Error("Une erreur inconnue est survenue");
    }
}

export const authService = {
  async register(data: any) {
    const response = await fetch(`${API_URL_Auth}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Erreur lors de l'inscription");
    return result;
  },

  async login(data: any) {
    const response = await fetch(`${API_URL_Auth}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Identifiants incorrects");
    return result;
  }
};

export const updateNews = async (id: string, data: UpdateNewsData) => {
  try {
    const formData = new FormData();

    if (data.title) formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    if (data.category) formData.append('category', data.category);
    if (data.image) formData.append('image', data.image);

    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de la mise à jour');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
        throw error
    }
    throw new ReferenceError("Erreur serveur, vérifiez votre connexion")
  }
};

export const getNewsById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Impossible de récupérer l'article");
    }

    return await response.json();
  } catch (error) {
    if(error instanceof Error) throw error;
    throw new ReferenceError("Erreur serveur, vérifiez votre connexion");
  }
};