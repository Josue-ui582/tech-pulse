export function formatDate(date?: string | Date) {
  if (!date) return "Date inconnue";

  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return "Date invalide";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
}