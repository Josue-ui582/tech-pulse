const API_URL_Auth = "http://localhost:3001/api"

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