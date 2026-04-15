const API_URL_Generate2FA = "http://localhost:3001/api/2fa/generate"
const API_URL_Verify2FA = "http://localhost:3001/api/2fa/verify"
const API_URL_Desabled2FA = "http://localhost:3001/api/2fa/desabled"

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

export const desabled2FA = async () => {
  try {
    const response = await fetch(`${API_URL_Desabled2FA}`, {
      method: "POST",
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Erreur lors de la désactivation de 2FA")
    }
  } catch (error: any) {
    throw new Error(error.message || "Erreur réseau")
  }
}