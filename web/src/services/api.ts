import { Category, SupportData, UpdateNewsData } from "../types/globalTypes";


const API_URL = "http://localhost:3001/api/news"
const API_URL_Auth = "http://localhost:3001/api"
const API_URL_Contact = "http://localhost:3001/api/contact"
const API_URL_Generate2FA = "http://localhost:3001/api/2fa/generate"
const API_URL_Verify2FA = "http://localhost:3001/api/2fa/verify"


export const getNews = async (category?: Category, search?: string) => {
    const params = new URLSearchParams();
    if (category && category.trim() !== "") {
        params.append("category", category);
    }
    
    if (search && search.trim() !== "") {
        params.append("search", search);
    }

    try {
        const res = await fetch(`${API_URL}?${params.toString()}`, {
            cache: "no-store"
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.error || `Erreur HTTP: ${res.status} (Impossible de charger les articles)`);
        }

        return await res.json();
    } catch (error) {
        if(error instanceof ReferenceError) throw error;
        throw new ReferenceError("Le serveur est injoignable. Vérifier votre connexion");
    }
}

export const getUniqueNew = async (id: string) => {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            cache: "no-store"
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.error || `Erreur HTTP: ${res.status} (Impossible de charger l'article)`);
        }

        return await res.json();
    } catch (error) {
        if(error instanceof ReferenceError) throw error;
        throw new ReferenceError("Article introuvable ou serveur injoignable. Vérifier votre connexion");
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
            body: formData,
            credentials: 'include', // Important pour inclure les cookies d'authentification
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
      credentials: 'include', // Important pour inclure les cookies
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
      credentials: 'include',
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
      credentials: 'include',
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

export const logOutUser = async () => {
  try {
    const response = await fetch(`${API_URL_Auth}/users/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur lors de la déconnexion");
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Une erreur inconnue est survenue lors de la déconnexion");
  }
};

export const updateAdminProfileSettings = async ( data: any) => {
  try {
    const response = await fetch(`${API_URL_Auth}/users`, {
      method: 'PATCH',
      credentials: 'include',
      body: data,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur lors de la mise à jour des paramètres");
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Une erreur inconnue est survenue lors de la mise à jour des paramètres");
  }
};

export const contactSupport = async (data: SupportData) => {
  try {
    const response = await fetch(`${API_URL_Contact}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur lors de l'envoi du message");
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Une erreur inconnue est survenue lors de l'envoi du message");
  }
};

export const updateAdminPasswordSettings = async (password: unknown) => {
  try {
    const response = await fetch(`${API_URL_Auth}/users/password`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(password),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur lors de la mise à jour du mot de passe");
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Une erreur inconnue est survenue lors de la mise à jour du mot de passe");
  }
};

export const generate2FA = async () => {
  try {
    const response = await fetch(`${API_URL_Generate2FA}`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur lors de la génération du QR code");
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Une erreur inconnue est survenue lors de la génération du QR code");
  }
};

export const verify2FA = async (code: string) => {
  try {
    const response = await fetch(`${API_URL_Verify2FA}`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur lors de la vérification du code 2FA");
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Une erreur inconnue est survenue lors de la vérification du code 2FA");
  }
};