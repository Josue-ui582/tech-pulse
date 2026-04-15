import { SupportData } from "../types/globalTypes";

const API_URL_Contact = "http://localhost:3001/api/contact"

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