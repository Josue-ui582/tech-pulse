const API_URL_Comment = "http://localhost:3001/api/comment"

export const getComments = async (newId: string) => {
  try {
    const response = await fetch(`${API_URL_Comment}?newId=${newId}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Erreur dans getComments:", error.message);
    throw error; // On propage l'erreur pour que le composant puisse l'afficher
  }
};

export const addComment = async (newId: string, comment: string) => {
  try {
    const response = await fetch(`${API_URL_Comment}?newId=${newId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ comment }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Erreur lors de l'ajout du commentaire");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Erreur dans addComment:", error.message);
    throw error;
  }
};

export const updateComment = async (commentId: string, comment: string) => {
  try {
    const response = await fetch(`${API_URL_Comment}?commentId=${commentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ comment }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Erreur lors de la modification");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Erreur dans updateComment:", error.message);
    throw error;
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const response = await fetch(`${API_URL_Comment}?commentId=${commentId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Erreur lors de la suppression");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Erreur dans deleteComment:", error.message);
    throw error;
  }
};