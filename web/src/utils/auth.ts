export const getUser = async () => {
  try {
    const res = await fetch("http://localhost:3001/api/auth/me", {
      credentials: "include",
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.user;
  } catch {
    return null;
  }
};

export const isAuthentificated = async () => {
  const user = await getUser();
  return !!user;
};