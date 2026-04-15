const API_URL_Auth = "http://localhost:3001/api"

export const authService = {
  async register(data: any) {
    const response = await fetch(`${API_URL_Auth}/users`, {
      method: 'POST',
      credentials: "include",
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