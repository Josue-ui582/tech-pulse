const API_URL_Auth = "http://localhost:3001/api"

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