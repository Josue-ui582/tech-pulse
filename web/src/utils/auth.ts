export const getUser = async () => {
  try {
    const res = await fetch("http://localhost:3001/api/auth/me", {
      credentials: "include",
    });

    if (!res.ok) return null;

    const data = await res.json();
    console.log("User data:", data);
    return data.user;
  } catch {
    return null;
  }
};