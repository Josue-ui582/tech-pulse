export const handleReaction = async (newsId: string, type: "Like" | "Unlike") => {
  const response = await fetch(`http://localhost:3001/api/reaction`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ newsId, type }),
  });
  if (!response.ok) throw new Error("Erreur");
  return response.json();
};