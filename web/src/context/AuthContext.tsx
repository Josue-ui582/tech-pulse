"use client";

import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { getUser } from "@/utils/auth";
import { logOutUser } from "@/services/api";
import { User } from "@/types/globalTypes";
import { AuthContextValue } from "@/types/globalTypes";
import message from "antd/es/message";

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    setLoading(true);
    try {
      const userData = await getUser();
      setUser(userData);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const logout = useCallback(async () => {
    try {
      await logOutUser();
    } catch {
      // Faire en sorte que l'état local persiste même en cas d'erreur de logout
        message.error("Erreur lors de la déconnexion, mais vous avez été déconnecté localement.");
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({ user, loading, isAuthenticated: Boolean(user), refreshUser, logout, setUser }),
    [user, loading, refreshUser, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
