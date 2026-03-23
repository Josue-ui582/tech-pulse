import { Category, UpdateNewsData } from "../types/news";


const API_URL = "http://localhost:3001/api/news"
const API_URL_Auth = "http://localhost:3001/api"


export const getNews = async (category?: Category, search?: string) => {
    const params = new URLSearchParams();
    if (category && category.trim() !== "") {
        params.append("category", category);
    }
    
    if (search && search.trim() !== "") {
        params.append("search", search);
    }

    const finalUrl = `${API_URL}?${params.toString()}`;
    // AJOUTE CE LOG pour vérifier l'URL générée dans ton terminal (si SSR) ou navigateur
    console.log("Appel API vers :", finalUrl);

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
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: data }), 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de la mise à jour');
    }

    return await response.json();
  } catch (error) {
    throw error;
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

export const deleteNew = async (id: string) => {
  
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Impossible de supprimer l'article");
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new ReferenceError("Erreur serveur lors de la suppression");
  }
};

export const increateNewView = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/${id}/view`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour des vues');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw error;
  }
};