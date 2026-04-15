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
    const result = await response.json();
    return result.data;
  } catch (error: any) {
    throw new Error("Erreur dans lors de la récupération des commentaire:", error.message);
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
    throw new Error("Erreur lors de l'ajout du commentaire", error.message);
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
    throw new Error("Erreur lors de la modification du commentaire", error.message);
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
    throw new Error("Erreur lors de la suppression de l'article", error.message);
  }
};